# Netlify 部署指南

## 准备工作

1. 确保所有代码已提交到Git仓库
2. 在Netlify上创建账户并连接到您的Git仓库

## 部署步骤

### 1. 基本配置

在Netlify控制台中设置以下构建配置：

- **构建命令**: `npm run build`
- **发布目录**: `dist`
- **Node.js版本**: 18（或更高版本）

这些设置已在 `netlify.toml` 文件中配置，Netlify应该会自动检测。

### 2. 环境变量设置

在Netlify控制台的 **Site settings > Build & deploy > Environment > Environment variables** 中添加：

- **GEMINI_API_KEY**: 您的Google Gemini API密钥

⚠️ **重要**: 不要将包含真实API密钥的 `.env.local` 文件提交到Git仓库！

### 3. 部署

1. 推送代码到Git仓库
2. Netlify将自动触发构建和部署
3. 如果构建失败，检查构建日志中的错误信息

## 常见问题解决

### 构建失败

如果遇到构建失败，请检查：

1. `package.json` 中是否有正确的构建脚本
2. 环境变量是否正确设置
3. 依赖项是否正确安装

### 路由问题

如果页面刷新后出现404错误，这是SPA应用的常见问题。我们已通过以下方式解决：

1. 在 `public/_redirects` 文件中添加了重定向规则
2. 在 `netlify.toml` 中配置了重定向规则

### API密钥问题

如果AI功能不工作，请检查：

1. Netlify环境变量中是否正确设置了 `GEMINI_API_KEY`
2. API密钥是否有效且有足够的配额

## 本地测试

在部署前，您可以在本地测试构建：

```bash
npm run build
npm run preview
```

这将启动一个本地服务器，模拟生产环境。

## 文件说明

- `netlify.toml`: Netlify配置文件，包含构建和部署设置
- `public/_redirects`: SPA路由重定向规则
- `.env.production`: 生产环境变量模板（不包含真实API密钥）
- `.gitignore`: 已更新，确保敏感信息不被提交

## 更新部署

每次推送代码到主分支时，Netlify会自动触发新的构建和部署。如果您修改了环境变量或构建配置，可能需要手动触发重新部署。