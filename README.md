# 奈斯导航系统(开源版)

这是一个功能强大的网址导航系统，采用前后端分离架构开发：
- 前端：基于 Nuxt3 框架开发（当前仓库）
- 后端：基于 PHP 的 Webman 框架开发，[后端仓库地址](https://github.com/Nice-CareFree/nice_nav_backend)

### 相关链接
- 后端仓库：[nice_nav_backend](https://github.com/Nice-CareFree/nice_nav_backend)
- 官方网站：[奈斯猫官网](http://www.nsmao.com)
- 交流QQ群：773515841

### 系统截图

![首页展示](/public/1.png)

![功能展示](/public/2.png)

## 部署指南

### 环境要求
- Node.js 16.x 或更高版本
- npm 8.x 或更高版本（或者使用 pnpm/yarn/bun）
- 确保有可用的服务器或云平台账号
- Docker 和 Docker Compose（如果使用 Docker 部署）

### 部署步骤

#### 方式一：Docker 部署（推荐）

1. **环境准备**
   ```bash
   # 确保已安装 Docker 和 Docker Compose
   docker -v
   docker-compose -v
   ```

2. **配置环境变量**
   ```bash
   # 复制环境变量示例文件并修改
   cp .env.example .env
   
   # 修改 .env 文件中的 VITE_SERVER_NAME 为你的后端服务器地址
   # 例如：VITE_SERVER_NAME=https://api.example.com
   ```

3. **使用 Docker Compose 启动服务**
   ```bash
   # 构建并启动容器
   docker-compose up -d
   
   # 查看容器状态
   docker-compose ps
   
   # 查看容器日志
   docker-compose logs -f
   ```

4. **更新部署**
   ```bash
   # 拉取最新代码后重新构建并启动
   docker-compose down
   docker-compose up -d --build
   ```

#### 方式二：传统部署

1. **环境变量配置**
   ```bash
   # 修改 .env 文件中的 VITE_SERVER_NAME 为你的服务器地址
   # 例如：VITE_SERVER_NAME=https://api.example.com
   ```

2. **准备工作**
   ```bash
   # 安装依赖
   npm install
   
   # 构建生产环境代码
   npm run build
   ```

3. **静态托管部署**
   如果你的项目是静态网站，可以将构建后的 `.output/public` 目录部署到任何静态托管服务：
   - Netlify
   - Vercel
   - GitHub Pages
   - 其他静态托管服务

4. **服务器部署**
   如果需要 SSR（服务端渲染）功能，请按以下步骤操作：

   a. 将以下文件/目录上传到服务器：
   - `.output` 目录（包含所有构建文件）
   - `package.json`
   - `nuxt.config.ts`

   b. 在服务器上安装依赖：
   ```bash
   npm install --production
   ```

   c. 启动服务：
   ```bash
   # 使用 Node.js 直接启动
   node .output/server/index.mjs

   # 或者使用 PM2 进程管理器
   pm2 start .output/server/index.mjs --name "github-nav"
   ```

5. **环境变量配置**
   - 在生产环境中，确保设置了必要的环境变量
   - 可以创建 `.env.production` 文件或在服务器上直接设置环境变量

6. **使用 PM2 管理（推荐）**
   ```bash
   # 安装 PM2
   npm install -g pm2

   # 启动应用
   pm2 start .output/server/index.mjs --name "github-nav"

   # 查看应���状态
   pm2 status

   # 查看日志
   pm2 logs github-nav

   # 重启应用
   pm2 restart github-nav
   ```

7. **Nginx 配置（可选）**
   如果使用 Nginx 作为反向代理，参考以下配置：
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### 常见问题排查

1. 如果遇到权限问题，请确保相关目录有正确的读写权限
2. 确保服务器防火墙已开放相应端口
3. 检查 Node.js 版本是否符合要求
4. 检查环境变量是否正确配置

#### Docker 部署常见问题

1. 如果容器无法启动，检查 Docker 日志：
   ```bash
   docker-compose logs nice-nav-frontend
   ```

2. 如果遇到端口冲突，修改 `docker-compose.yml` 中的端口映射：
   ```yaml
   ports:
     - "3001:3000"  # 将主机的 3001 端口映射到容器的 3000 端口
   ```

3. 如果需要自定义 Docker 网络配置，可以修改 `docker-compose.yml` 中的网络设置

4. 环境变量问题：确保 `.env` 文件存在且包含必要的配置

### 性能优化建议

1. 启用 Gzip 压缩
2. 配置适当的缓存策略
3. 使用 CDN 加速静态资源
4. 开启 PM2 的集群模式以充分利用多核 CPU

#### Docker 优化建议

1. 使用多阶段构建减小镜像体积
2. 配置 Docker 容器的资源限制
3. 使用 Docker 数据卷持久化重要数据
4. 定期清理未使用的 Docker 镜像和容器

如果遇到任何部署问题，请查看 [Nuxt.js 官方部署文档](https://nuxt.com/docs/getting-started/deployment) 或提交 Issue。
