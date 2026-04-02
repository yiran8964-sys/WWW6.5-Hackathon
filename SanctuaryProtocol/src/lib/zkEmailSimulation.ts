import { keccak256, toBytes } from 'viem';

export interface VerificationStep {
  text: string;
  duration: number;
}

export const VERIFICATION_STEPS: VerificationStep[] = [
  { text: '正在断开网络连接，确保数据完全停留在本地...', duration: 1500 },
  { text: '正在读取邮箱服务商的官方签名...', duration: 2000 },
  { text: '正在为你生成绝对匿名的数字存根...', duration: 2500 },
  { text: '邮箱地址已在本地物理粉碎 🗑️', duration: 1000 },
];

export async function simulateZKProof(
  email: string,
  onProgress: (step: string, progress: number) => void
): Promise<{ success: boolean; emailHash: string }> {
  let totalProgress = 0;
  const totalDuration = VERIFICATION_STEPS.reduce((sum, s) => sum + s.duration, 0);

  for (const step of VERIFICATION_STEPS) {
    onProgress(step.text, totalProgress / totalDuration);
    await sleep(step.duration);
    totalProgress += step.duration;
  }

  onProgress('验证完成', 1);

  const emailHash = hashEmail(email);
  return { success: true, emailHash };
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function hashEmail(email: string): string {
  return keccak256(toBytes(email.toLowerCase()));
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isGmail(email: string): boolean {
  return email.toLowerCase().endsWith('@gmail.com');
}
