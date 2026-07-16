# 居家恢复训练助手

Vue 3 前端 + Cloudflare Worker/D1 后端。用户可以游客身份生成一次性 AI 训练计划，也可以使用用户名和密码登录并保存历史计划。

## 本地运行

```bash
npm install
cp .env.example .env.local
npm run dev
```

没有配置 Clerk 或 Worker 时，页面仍可打开，但 AI 生成、登录和历史计划不可用。

## 当前开发测试配置

> Clerk Development 实例最多支持 100 个用户，采用与生产环境不同的会话架构，只适合开发和内部测试。Clerk Production 必须绑定一个自己拥有且可以修改 DNS 的域名；`wddxbgsx.github.io` 不能直接作为 Clerk 正式生产域名。

### 1. Clerk 用户名密码登录

1. 创建 Clerk Hobby 免费应用。
2. 在 **User & authentication** 中启用 Username 和 Password。
3. 将 Username 设为注册和登录标识；关闭不需要的 Email、Phone 和社交登录。
4. 用户名规则设为 4–64 字符。界面额外限制为字母、数字、`_`、`-`。
5. 将 Publishable Key 写入 `.env.local` 的 `VITE_CLERK_PUBLISHABLE_KEY`。

Publishable Key 可以出现在前端；Clerk Secret Key 只能放在 Cloudflare Secret 中。

### 2. Cloudflare Worker 与 D1

登录 Cloudflare 后执行：

```bash
npx wrangler login
npx wrangler d1 create rehab-assistant-db
```

把返回的 `database_id` 填入 `wrangler.toml`，同时更新：

- `FRONTEND_ORIGINS`：允许访问 API 的前端 Origin，多个用逗号分隔。
- `LLM_BASE_URL`：OpenAI-compatible API 的 `/v1` 地址。
- `LLM_MODEL`：模型名。
- `CLERK_PUBLISHABLE_KEY`：Clerk 公开密钥。

设置两个不可公开的 Secret：

```bash
npx wrangler secret put LLM_API_KEY
npx wrangler secret put CLERK_SECRET_KEY
npm run db:migrate
npm run worker:deploy
```

部署后把 Worker 地址写入 `.env.local` 的 `VITE_API_URL`。

### 3. GitHub Pages（仅作开发预览）

在仓库 **Settings → Secrets and variables → Actions** 中加入：

- `VITE_CLERK_PUBLISHABLE_KEY`
- `VITE_API_URL`

推送到 `main` 后会自动构建和部署前端。大模型密钥和 Clerk Secret Key 不进入 GitHub Pages。使用 `pk_test_` / `sk_test_` 时，该部署只能作为开发预览，不应作为正式公开的账号系统。

## 正式上线前的账号方案

二选一：

1. 购买并绑定自有域名，继续使用 Clerk Production。
2. 保持零域名成本，移除 Clerk，改为 Cloudflare Worker + D1 自建用户名密码与会话系统。此方案无需增加平台费用，但需要自行承担密码散列、会话撤销、限流和账号恢复等安全维护。

## 数据与安全

- 登录用户的历史计划存入 D1，并以 Clerk `userId` 隔离。
- 游客计划不存入云端，只在当前浏览器会话中暂存。
- 游客每个 IP 每小时最多生成 5 次，降低模型 API 被滥用的风险。
- 模型只能返回动作库中已有的动作 ID；Worker 会校验阶段、ID、去重和动作数量。
- 补充信息限制为 800 字，并提醒用户不要填写姓名、电话等隐私信息。
- 这是训练辅助工具，不构成医疗建议。
