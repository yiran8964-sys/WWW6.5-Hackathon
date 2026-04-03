// ✅ 第一行：必须先加载环境变量！！！
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import rootRouter from './routes';
import { errorMiddleware } from './middlewares/error.middleware';
import { loggerMiddleware } from './middlewares/logger.middleware';

const app = express();

// ✅ 我帮你改好了：Railway 部署 + 本地开发 都兼容
const PORT = Number(process.env.PORT) || Number(env.PORT);

// 全局中间件
app.use(cors()); // 跨域处理
app.use(express.json({ limit: '10mb' })); // JSON请求体解析
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware); // 请求日志

// 挂载根路由
app.use('/api/v1', rootRouter);

// 健康检查接口
app.get('/health', (req, res) => {
  res.json({ success: true, message: 'Rate My Mentor 后端服务运行正常', timestamp: new Date().toISOString() });
});

// 全局错误处理
app.use(errorMiddleware);

// 启动服务 ✅ 修改后，外网就能访问了
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 后端服务已启动，运行在端口 ${PORT}`);
  console.log(`📊 健康检查地址：/health`);
});
