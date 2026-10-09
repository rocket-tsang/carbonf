# AGENTS.md

本文件为 **AI 代理（Claude Code / opencode / Cursor 等）** 在本仓库工作的操作规范。
适用于 `carbonfibercy.com`（HAPPYCOMPOSITE 官网前端）。

---

## 1. 项目速览

- **技术栈**：Nuxt 4 + Vue 3 + TypeScript + Tailwind CSS 4 + Pinia + `@nuxtjs/i18n` + Swiper + Motion-v。
- **渲染**：默认 SSR + 客户端水合；`pnpm generate` 可全量静态化。
- **后端**：RuoYi（Spring Boot），通过 `runtimeConfig.public.apiBase`（默认 `https://web.carbonfibercy.com/prod-api`）访问，Nitro 亦配置了 `/prod-api/**` 反代。
- **包管理**：**pnpm**（`pnpm-workspace.yaml` 存在但当前为单包）。
- **Node**：≥ 20。

---

## 2. 目录约定（真实结构，勿臆造）

```
app/
  app.vue                    根组件
  assets/css/tailwind.css    @import "tailwindcss" + @theme
  components/                扁平自动注册组件（Carousel/Field/SectionTitle/SiteHeader/SiteFooter/SmartImage）
  layouts/default.vue        默认布局
  pages/                     index / about / capabilities / sections / sustainability / contact
  utils/                     request.ts（useApi）、seo.ts（usePageSeo）
i18n/
  i18n.config.ts             defineI18nConfig
  locales/{en,zh}.json
public/
  favicon.ico、robots.txt、sitemap.xml、img/*
nuxt.config.ts
```

**尚未存在**的目录（如 `composables/`、`stores/`、`middleware/`、`plugins/`、`server/`、`app/error.vue`、`app.config.ts`）—— 需要时再新建，**不要**在文档或代码里声称它们已存在。

---

## 3. 常用命令

| 目的 | 命令 |
| --- | --- |
| 安装依赖 | `pnpm install` |
| 本地开发 | `pnpm dev`（http://localhost:3000） |
| 类型检查 | `pnpm typecheck` |
| 生产构建 | `pnpm build`（输出 `.output/`） |
| 本地预览生产 | `pnpm preview` |
| 全量静态化 | `pnpm generate` |

**任务完成前必须至少跑一次 `pnpm typecheck`**（若改动涉及 TS/Vue 文件）。当前仓库**没有** ESLint / Prettier / test 脚本，不要臆造 `pnpm lint` / `pnpm test`。

---

## 4. 编码规范

### 4.1 Vue / Nuxt

- 一律使用 `<script setup lang="ts">`。
- 组件文件名 **PascalCase**（如 `SmartImage.vue`）。使用时同样 PascalCase：`<SmartImage />`。
- 组件位于 `app/components/` 顶层，Nuxt 自动全局注册，**不要手动 `import`**。
- 页面在 `app/pages/`，文件名即路由；动态路由用 `[slug].vue`。
- 复用逻辑放 `app/composables/`（如需新建），命名 `useXxx.ts`。
- 全局状态用 Pinia，store 放 `app/stores/`。

### 4.2 数据请求

- **必须**通过 `useApi()`（`app/utils/request.ts`）发起后端请求，不要直接 `$fetch` 硬编码 URL。
- SSR 阶段的数据用 `useAsyncData` / `useFetch` 包一层，避免二次请求。
- 后端接口路径以 `/web/...` 开头（RuoYi 约定），已知：
  - `POST /web/userMessage/submit` — 联系页留言（`contact.vue`）。

### 4.3 SEO

- 页面顶部调用 `usePageSeo({ title, description, image })`（`app/utils/seo.ts`）。
- 不要在页面里再单独写 `useSeoMeta` 重复设置 title —— 除非有特殊需要。
- 站点默认 title / meta 在 `nuxt.config.ts > app.head`。

### 4.4 国际化

- 使用 `useI18n()`：`const { t, locale } = useI18n()`。
- 文案键统一放 `i18n/locales/en.json` 与 `zh.json`，**两份必须同步更新**。
- 路由策略 `no_prefix`，切换语言不改变 URL。
- 布局根据 `locale` 设置 `<html lang>`（`layouts/default.vue`）。

### 4.5 样式（Tailwind 4）

- 优先使用 utility class；不要新增 SCSS/Less，也不要写全局样式表。
- 品牌色统一走 `@theme` 定义的 `brand-*` 变量（见 `app/assets/css/tailwind.css`）。
- 容器居中使用 `.container-x`（1280 / 1920 时 1600）。
- 断点：默认 Tailwind + 自定义 `3xl 1920`。
- 需要新增品牌 token 时，改 `tailwind.css` 里的 `@theme` 块，不要写内联 hex。

### 4.6 图片

- 静态图放 `public/img/`。业务图统一用 `<SmartImage />`（封装 `@nuxt/image`），获得 `srcset` / WebP。
- 大图务必声明 `width` / `height`，避免 CLS。

### 4.7 图标

- 使用 `<Icon name="lucide:xxx" />`（`@nuxt/icon` + `@iconify-json/lucide`）。
- 不要新装第三方图标字体。

### 4.8 动效

- 使用 `motion-v` 的 `<Motion />` 组件；滚动入场用 `whileInView`。
- 保持克制：Hero、区块入场、卡片 hover 可用；正文段落慎用。

---

## 5. 修改文件的边界

**允许**：

- `app/**`、`i18n/**`、`public/**`、`nuxt.config.ts`、`README.md`、`AGENTS.md`。
- `package.json`（新增依赖前**先确认**是否真的必要，避免体积膨胀）。

**谨慎**：

- `.env.example`：改动需同步告知运维；不要提交任何真实密钥。
- `pnpm-lock.yaml`：仅在运行 `pnpm install` / `pnpm add` 后由工具生成，**不要手改**。

**禁止**：

- 提交 `.env`、`.output/`、`.nuxt/`、`node_modules/`、`dist/`（`dist` 为 `.output/public` 软链）—— 已在 `.gitignore`。
- 未经用户明确指令，不要 `git commit` / `git push`。
- 不要引入 ESLint / Prettier 配置或大改构建管线，除非用户要求。

---

## 6. 新增能力的最小步骤

**新页面**：

1. 在 `app/pages/` 新建 `xxx.vue`，`<script setup lang="ts">`。
2. 顶部 `usePageSeo({ title: t('xxx.title') })`。
3. 文案键加入 `i18n/locales/{en,zh}.json`。
4. 若导航需展示，编辑 `app/components/SiteHeader.vue`。

**新组件**：

- 放 `app/components/`，PascalCase 命名，直接在页面 `<XxxYyy />` 使用（自动注册）。

**新接口**：

- 在页面/组件内 `const api = useApi()`，`await api('/web/xxx', { method: 'POST', body })`。
- 不要为每个接口再包一层 axios 风格 service，除非接口量显著增多。

**新依赖**：

- `pnpm add <pkg>`；SSR 相关运行库如需打进 bundle，`nuxt.config.ts > vite.ssr.noExternal` 追加。

---

## 7. 提交与协作

- 未经用户明示，**不要**自动 commit、amend、push、force-push 或建 PR。
- 修改 UI 后，运行 `pnpm dev` 至少目视验证一次（若环境允许）。
- 修改类型/接口后，运行 `pnpm typecheck`。
- 变更影响运维部署（Nginx 路径、`.output` 结构、`apiBase`）时，在提交说明或对话中显式提醒。

---

## 8. 常见坑

- **Nuxt 4 `app/` 目录**：源码在 `app/` 内，`~` 指向 `app/`（组件、utils、composables 自动注册均以此为根）。
- **i18n `restructureDir`**：当前使用 `i18n/` 目录 + `i18n.config.ts`，不是 `app/i18n/`。
- **`_api` 单例**：`useApi()` 使用模块级缓存变量，测试或 SSR 边界情形下注意冷启动时机。
- **`dist` 是软链**：指向 `.output/public`，删源目录会导致软链失效。
- **`.npmrc` 允许 `esbuild` / `sharp` 构建脚本**：新增涉及 native binding 的包时可能要追加 `allowBuilds`。

---

## 9. 求助与升级

- 涉及后端接口字段变动，先与 RuoYi 后端开发确认，再改前端调用。
- 涉及品牌配色 / 字体 / Logo，改动 `@theme` 前先与设计确认。
- 遇到 Nuxt / Vite 报错，先看 `.nuxt/` 与 `node_modules` 是否是 `pnpm install --frozen-lockfile` 之后的干净状态。
