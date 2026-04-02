import { getPinataClient } from '../config/pinata';
//import { pinataClient } from '../config/pinata';
import { encryptContent } from '../utils/encryption.util';
//import { encryptContent, decryptContent } from '../utils/encryption.util';
//G言：service 不在模块加载时绑定 client，而是在调用时按需获取。这和整个项目现在的配置层设计是一致的。

export class IPFSService {
  // 1. 加密评价内容，上传到IPFS，返回CID
  static async uploadEncryptedReview(
    rawContent: string
  ): Promise<{ cid: string; ipfsUrl: string }> {
    // 先加密原始评价内容
    const encryptedContent = encryptContent(rawContent);

    // 上传到Pinata IPFS
    const uploadResult = await pinataClient.pinJSONToIPFS(
      {
        encryptedContent,
        uploadTime: new Date().toISOString(),
      },
      {
        pinataMetadata: { 
          name: 'mentor-review-encrypted' },
      }
    );

    const cid = uploadResult.IpfsHash; //易为新添

    return {
      cid,
      ipfsUrl: `https://gateway.pinata.cloud/ipfs/${cid}`,
    };
  }
}

//G的修改理由：收缩为只保留 uploadEncryptedReview() 这一条当前主链路必需能力。当前主链路真正必须的是上传，不是读取。
// 你们现在走的是：
// 前端交 rawContent
// 后端加密上传
// 后端返回 cid/ipfsUrl/cidBytes32
// 前端继续链上提交
// 这个闭环只依赖 uploadEncryptedReview()。
// 既然最终保留版是在为当前系统“定边界”，那 service 就应该围绕这个必要能力收缩，而不是为了“看起来完整”把非核心接口一起带着。

//     return {
//       cid: uploadResult.IpfsHash,
//       ipfsUrl: `https://gateway.pinata.cloud/ipfs/${uploadResult.IpfsHash}`,
//     };
//   }

//   // 2. 从IPFS获取加密内容，解密后返回原始评价
//   static async getDecryptedReview(cid: string): Promise<string> {
//     try {
//       // 从IPFS网关获取内容
//       const response = await fetch(`https://gateway.pinata.cloud/ipfs/${cid}`);
//       if (!response.ok) throw new Error('IPFS内容获取失败');

//       const data = await response.json();
//       // 解密内容
//       const rawContent = decryptContent(data.encryptedContent);

//       return rawContent;
//     } catch (error) {
//       console.error('IPFS内容解密失败：', error);
//       throw new Error('评价内容获取失败');
//     }
//   }
// }
