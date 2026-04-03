// ✅ 第一行：全局加载环境变量（最优先）
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import rootRouter from './routes';
import { errorMiddleware } from './middlewares/error.middleware';
import { loggerMiddleware } from './middlewares/logger.middleware';

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);

// 路由
app.use('/api/v1', rootRouter);

// 健康检查
app.get('/health', (req, res) => {
  res.json({ success: true, message: '服务运行正常' });
});

// 错误处理
app.use(errorMiddleware);

// 启动
app.listen(PORT, () => {
  console.log(`🚀 服务启动成功 端口：${PORT}`);
});

// 启动服务
app.listen(PORT, () => {
  console.log(`🚀 后端服务已启动，运行在 http://localhost:${PORT}`);
  console.log(`📊 健康检查地址：http://localhost:${PORT}/health`);
});
