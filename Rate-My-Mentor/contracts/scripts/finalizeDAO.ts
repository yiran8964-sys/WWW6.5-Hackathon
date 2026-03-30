import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

const DAO_ADDRESS = "0x481D0fd5a05eEdc6971c165BBC2D2aB1a2Dce744";
const REVIEW_CONTRACT_ADDRESS = "0x3845300491F10FC8C87694C5c8D7D62bFc12e1DC";

const DAO_ABI = [
  "function finalizeProposal(uint32 proposalId) external",
  "function executeProposal(uint32 proposalId) external",
  "function proposals(uint256 id) external view returns (address proposer, uint32 id, uint32 deadline, bool executed, uint32 votesFor, uint32 votesAgainst, uint32 executionTime, uint32 snapshotTotalSupply, uint256 targetReviewId, uint8 action)"
];

const REVIEW_ABI = [
  "function getReputationScore(bytes32 _targetId) external view returns (uint128)"
];

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.AVALANCHE_FUJI_RPC_URL);
  const wallet = new ethers.Wallet(process.env.AVALANCHE_PRIVATE_KEY!, provider);

  const dao = new ethers.Contract(DAO_ADDRESS, DAO_ABI, wallet);
  const review = new ethers.Contract(REVIEW_CONTRACT_ADDRESS, REVIEW_ABI, wallet);

  const proposalId = 0;
  const targetId = ethers.keccak256(ethers.toUtf8Bytes("mentor:0x1234"));
  const now = Math.floor(Date.now() / 1000);

  const proposal = await dao.proposals(proposalId);
  const executionTime = Number(proposal.executionTime);
  const deadline = Number(proposal.deadline);

  if (now < deadline) {
    console.log(`投票期还未结束，还需等待 ${deadline - now} 秒`);
    return;
  }

  if (executionTime === 0 && !proposal.executed) {
    console.log("正在 finalize 提案...");
    const tx = await dao.finalizeProposal(proposalId);
    await tx.wait();
    console.log("✅ finalize 成功");
    const updated = await dao.proposals(proposalId);
    console.log(`timelock 解锁时间: ${new Date(Number(updated.executionTime) * 1000).toLocaleString()}`);
    console.log(`还需等待 ${Number(updated.executionTime) - now} 秒后可以 execute`);
    return;
  }

  if (now < executionTime) {
    console.log(`timelock 还未结束，还需等待 ${executionTime - now} 秒`);
    return;
  }

  console.log("正在 execute 提案...");
  const tx = await dao.executeProposal(proposalId);
  await tx.wait();
  console.log("✅ execute 成功");

  const scoreAfter = await review.getReputationScore(targetId);
  console.log("执行后聚合评分:", scoreAfter.toString());
}

main().catch(console.error);