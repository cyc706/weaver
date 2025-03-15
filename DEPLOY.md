# 部署指南

## GitHub Actions 自动部署配置

本项目使用GitHub Actions实现自动化部署。当代码推送到`main`分支时，将自动触发部署流程。

### 工作流程说明

部署工作流程（`.github/workflows/deploy.yml`）包含以下步骤：

1. 检出代码
2. 设置Node.js环境
3. 安装项目依赖
4. 构建Next.js应用
5. 通过SSH连接到生产服务器
6. 在服务器上拉取最新代码、安装依赖、构建应用并重启服务

### 配置GitHub Secrets

为了使部署工作流正常工作，您需要在GitHub仓库中配置以下secrets：

1. `SERVER_HOST`: 生产服务器的IP地址或域名
2. `SERVER_USERNAME`: SSH登录用户名
3. `SSH_PRIVATE_KEY`: SSH私钥（确保对应的公钥已添加到服务器的authorized_keys中）
4. `SERVER_PORT`: SSH端口（通常为22）

### 配置步骤

1. 在GitHub仓库页面，点击 Settings > Secrets and variables > Actions
2. 点击 "New repository secret" 按钮
3. 添加上述所需的secrets

### 服务器配置

确保服务器上已安装以下软件：

1. Git
2. Node.js (v20+)
3. npm
4. PM2 (用于进程管理)

### 修改部署脚本

在首次使用前，请修改`.github/workflows/deploy.yml`文件中的以下内容：

```yaml
script: |
  cd /path/to/your/project  # 修改为服务器上项目的实际路径
  git pull
  npm install
  npm run build
  pm2 restart weaver || pm2 start npm --name "weaver" -- start
```

### 手动触发部署

除了通过推送代码到`main`分支触发部署外，您也可以在GitHub仓库页面的Actions标签页手动触发工作流。