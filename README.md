# 乡野青创 · CCTI 乡创人格指数

基于 XCTI 三维人格模型的乡村匹配系统。27 种乡创人格类型 × 6 种村格，帮助乡村建设者找到属于自己的乡村定位与共创方向。

## 项目结构

```
hola-main/        # CCTI 主应用 (Bun + TypeScript)
  api/            # CCTI API（测试提交、结果查询、Semi 身份绑定）
  public/         # 前端 SPA（app.js + styles.css）
    assets/       # 静态资源（logo、27 人格插画）
semi-app/         # Semi 数字身份钱包 (Nuxt 3)
figs/             # 人格插画源文件
```

## 技术栈

- **前端**: 原生 JS SPA，移动端 H5
- **后端**: Bun + TypeScript，SQLite
- **部署**: Vercel / 任意支持 Bun 的服务器

## 本地运行

```bash
cd hola-main
bun install
bun dev        # 开发模式，监听热重载
bun start      # 生产模式
```

## 环境变量

参考 `hola-main/.env.example`：

| 变量 | 说明 |
|------|------|
| `PORT` | 服务端口，默认 4000 |
| `SESSION_SECRET` | 会话加密密钥 |
| `SEMI_CLIENT_ID` | Semi OAuth 客户端 ID（可选） |
| `SEMI_CLIENT_SECRET` | Semi OAuth 密钥（可选） |

## 纯静态部署

将 `hola-main/public/` 目录部署到任意静态服务器，并将 `index.html` 中的：

```js
var CCTI_CONFIG = { apiBase: "/api", useBackend: true };
```

改为 `useBackend: false`，测试结果将存储在浏览器本地。
