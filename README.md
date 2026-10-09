# carbonfibercy.com

`carbonfibercy.com`（站点品牌：**HAPPYCOMPOSITE** / 碳纤维制品）官网前端项目。

本仓库为**前端工程**，后端基于 RuoYi（Spring Boot）独立部署，前端通过 `/prod-api` 反向代理调用。

---

## 一、技术栈

| 层 | 选型 | 用途 |
| --- | --- | --- |
| Meta 框架 | **Nuxt 4**（`future.compatibilityVersion: 4`） | 文件路由、SSR/SSG、模块化、约定式目录 |
| UI 样式 | **Tailwind CSS 4**（`@tailwindcss/vite`） | Utility-first CSS（CSS-first 配置 `@theme`） |
| 渲染 | **SSR + 客户端水合**（默认） | 利于 SEO 收录 |
| 状态管理 | **Pinia** (`@pinia/nuxt`) | 跨组件状态、表单缓存（预留） |
| 国际化 | **vue-i18n 11** + **@nuxtjs/i18n 10**（`strategy: no_prefix`） | 中英双语 |
| 数据请求 | **`ofetch` 封装（`useApi`）**、`useAsyncData` / `useFetch` | 自动 SSR 反序列化 |
| 轮播 | **Swiper 14** | Banner / 产品 / 客户案例 |
| 动效 | **Motion-v** | 滚动入场、页面转场、精细交互动效 |
| 图片 | **@nuxt/image** + 自定义 `<SmartImage />` | 自动 `srcset`、WebP/AVIF、懒加载 |
| 图标 | **@nuxt/icon** + `@iconify-json/lucide` | 按需图标、零额外资源包 |
| 表单 | 原生 + HTML5 Validation | 联系页留言 |
| Node | **≥ 20.x**（Nuxt 4 要求） | — |
| 包管理 | **pnpm**（`pnpm-workspace.yaml`） | workspace 友好、磁盘占用低 |
| 构建 | **Vite**（Nuxt 4 内置） | 极速 HMR、ESM 原生、按需编译 |
| 部署 | **Nitro 构建产物 + Nginx** | SSR 节点或纯静态托管两种模式 |

---

## 二、目录结构（当前仓库实际结构）

```
carbonfibercy.com/
├─ app/                              # Nuxt 4 应用主目录
│  ├─ app.vue                        # 根组件：<NuxtLayout><NuxtPage/>
│  ├─ assets/
│  │  └─ css/
│  │     └─ tailwind.css             # @import "tailwindcss" + @theme 品牌变量
│  ├─ components/                    # 全局自动注册组件（扁平）
│  │  ├─ Carousel.vue                # Swiper 封装
│  │  ├─ Field.vue                   # 表单输入
│  │  ├─ SectionTitle.vue            # 区块标题
│  │  ├─ SiteHeader.vue              # 顶部导航
│  │  ├─ SiteFooter.vue              # 页脚
│  │  └─ SmartImage.vue              # 图片封装（@nuxt/image 之上）
│  ├─ layouts/
│  │  └─ default.vue                 # 默认布局：Header + <slot /> + Footer
│  ├─ pages/
│  │  ├─ index.vue                   # /                → 首页
│  │  ├─ about.vue                   # /about           → 关于我们
│  │  ├─ capabilities.vue            # /capabilities    → 生产能力
│  │  ├─ sections.vue                # /sections        → 型材 / 产品
│  │  ├─ sustainability.vue          # /sustainability  → 可持续发展
│  │  └─ contact.vue                 # /contact         → 联系我们
│  └─ utils/
│     ├─ request.ts                  # ofetch 封装：useApi()
│     └─ seo.ts                      # usePageSeo()：统一 SEO 头 + canonical
│
├─ i18n/                             # @nuxtjs/i18n restructureDir
│  ├─ i18n.config.ts                 # defineI18nConfig 入口
│  └─ locales/
│     ├─ en.json
│     └─ zh.json
│
├─ public/
│  ├─ favicon.ico
│  ├─ robots.txt
│  ├─ sitemap.xml
│  └─ img/                           # 站点静态图（hero / product / factory / img-xxx …）
│
├─ nuxt.config.ts                    # Nuxt 主配置
├─ tsconfig.json                     # 继承 .nuxt/tsconfig.json
├─ package.json
├─ pnpm-workspace.yaml
├─ pnpm-lock.yaml
├─ .npmrc                            # allowBuilds: esbuild, sharp
├─ .env.example
├─ .gitignore
├─ AGENTS.md                         # AI 代理协作规范
└─ README.md
```

> Nuxt 4 启用了新的 `app/` 目录约定，源码与运行时配置隔离。
> 目前尚未创建 `composables/`、`stores/`、`middleware/`、`plugins/`、`server/` 等目录，
> 按需新增即可（Nuxt 会自动识别）。

---

## 三、路由结构

| 路径 | 页面文件 | 备注 |
| --- | --- | --- |
| `/` | `app/pages/index.vue` | 首页 + Banner |
| `/about` | `app/pages/about.vue` | 关于我们 |
| `/capabilities` | `app/pages/capabilities.vue` | 生产能力 / 工艺 |
| `/sections` | `app/pages/sections.vue` | 型材 / 产品分类 |
| `/sustainability` | `app/pages/sustainability.vue` | 可持续发展 |
| `/contact` | `app/pages/contact.vue` | 联系我们 + 表单 |

`@nuxtjs/i18n` 采用 `strategy: 'no_prefix'`，路径不带语言前缀，
语言由客户端切换（`useI18n().locale`）并写入 cookie。

---

## 四、API 与后端协作

后端为 **RuoYi（Spring Boot）** 服务，前端通过 `runtimeConfig.public.apiBase` 定位。

### 运行时配置（`nuxt.config.ts`）

```ts
runtimeConfig: {
  public: {
    apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://web.carbonfibercy.com/prod-api',
    siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.carbonfibercy.com',
  },
},
nitro: {
  routeRules: {
    '/prod-api/**': {
      proxy: (process.env.NUXT_PUBLIC_API_BASE || 'https://web.carbonfibercy.com/prod-api') + '/**',
    },
  },
},
```

### 业务接口

| 方法 | 路径 | 用途 |
| --- | --- | --- |
| `POST` | `/web/userMessage/submit` | 联系页留言提交（`app/pages/contact.vue`） |

### 请求封装 `app/utils/request.ts`

```ts
import { ofetch } from 'ofetch'

let _api: ReturnType<typeof ofetch.create> | null = null

export function useApi() {
  if (!_api) {
    const { public: { apiBase } } = useRuntimeConfig()
    _api = ofetch.create({
      baseURL: apiBase,
      timeout: 15_000,
      onRequest({ options }) {
        if (import.meta.client) {
          options.headers = { ...options.headers, 'X-Client': 'nuxt-web' }
        }
      },
      onResponseError({ response }) {
        console.error('[API]', response.status, response._data)
      },
    })
  }
  return _api
}
```

### SSR 数据获取示例

```vue
<script setup lang="ts">
const { data, error } = await useAsyncData('sections', () =>
  useApi()('/web/sections/list', { method: 'GET' })
)
</script>
```

---

## 五、Tailwind CSS 4 设计约定

`app/assets/css/tailwind.css`（当前实际内容）：

```css
@import "tailwindcss";

@theme {
  --color-brand-ink:      #0a2540;
  --color-brand-ink-2:    #122b46;
  --color-brand-steel:    #2c3e58;
  --color-brand-mist:     #eef2f6;
  --color-brand-cloud:    #f6f8fb;
  --color-brand-line:     #d6dde5;
  --color-brand-accent:   #ff6a00;
  --color-brand-accent-2: #ff8a3d;
  --color-brand-mute:     #6b7a8c;
  --color-brand-success:  #1ea672;

  --font-display: "Inter", "Helvetica Neue", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;

  --container-2xl: 1440px;
  --breakpoint-3xl: 1920px;
}
```

品牌 utility 命名对照：

| 变量 | Utility |
| --- | --- |
| `--color-brand-ink` | `text-brand-ink` / `bg-brand-ink` |
| `--color-brand-accent` | `text-brand-accent` / `bg-brand-accent` |
| `--color-brand-mist` | `bg-brand-mist` |
| `--font-display` | `font-display` |

其他约定：

- 使用 `.container-x` 作为统一居中容器（1280px，≥1920 时 1600px）。
- `.text-gradient` 提供品牌文字渐变（用于 Hero 标题）。
- 断点沿用 Tailwind 默认：`sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536`，另增 `3xl 1920`。

---

## 六、常用命令

```bash
# 安装依赖（首次会自动执行 nuxt prepare）
pnpm install

# 启动开发（默认 http://localhost:3000）
pnpm dev

# 类型检查（vue-tsc）
pnpm typecheck

# 构建生产产物（默认 SSR，输出到 .output/）
pnpm build

# 本地预览生产产物
pnpm preview

# 静态化（可选，全量预渲染 + CDN 部署）
pnpm generate
```

> 仓库根目录存在软链 `dist -> .output/public`，方便老部署脚本继续用 `dist/` 路径。

---

## 七、构建与发布

### 1. 构建产物

`pnpm build` 输出到 `.output/`：

```
.output/
├─ public/                 # 静态资源（含 _nuxt/、favicon、robots.txt、sitemap.xml、img/…）
├─ server/                 # Nitro 服务端入口
│  └─ index.mjs
└─ nitro.json
```

- **SSR 模式**：`node .output/server/index.mjs` 起服务（默认端口 `3000`，可用 `PORT` 覆盖）。
- **静态托管**：直接把 `.output/public/`（或 `dist/`）交给 Nginx（页面已 SSG 或走客户端渲染）。

### 2. Nginx 参考配置

```nginx
server {
  listen 443 ssl http2;
  server_name www.carbonfibercy.com;

  ssl_certificate     /etc/nginx/ssl/carbonfibercy.com.crt;
  ssl_certificate_key /etc/nginx/ssl/carbonfibercy.com.key;

  # 静态托管：.output/public（或 dist/）
  root /www/carbonfibercy.com/.output/public;
  index index.html;

  # Vite 产物 hash 资源长期缓存
  location /_nuxt/ {
    expires 365d;
    access_log off;
    add_header Cache-Control "public, immutable";
  }

  # 图片资源
  location /img/ {
    expires 30d;
    add_header Cache-Control "public";
  }

  # HTML 入口短缓存，便于回滚
  location / {
    expires 1h;
    add_header Cache-Control "public, must-revalidate";
    try_files $uri $uri/ /index.html;
  }

  # 业务接口反代 → RuoYi
  location /prod-api/ {
    proxy_pass https://web.carbonfibercy.com/prod-api/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_read_timeout 30s;
  }

  location = /robots.txt  { access_log off; }
  location = /sitemap.xml { access_log off; }
}
```

### 3. SSR 模式（可选）

若走 SSR，可用 `pm2` / `systemd` 常驻 Nitro 进程，Nginx 反代到 `127.0.0.1:3000`：

```nginx
location / {
  proxy_pass http://127.0.0.1:3000;
  proxy_http_version 1.1;
  proxy_set_header Host $host;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
}
```

---

## 八、环境变量（`.env.example`）

```env
NUXT_PUBLIC_API_BASE=https://web.carbonfibercy.com/prod-api
NUXT_PUBLIC_SITE_URL=https://www.carbonfibercy.com
NUXT_PUBLIC_DEFAULT_LOCALE=en
```

> `.env` / `.env.*` 已加入 `.gitignore`，仅 `.env.example` 入库。

---

## 九、SEO

- 每页使用 `usePageSeo({ title, description, image })`（`app/utils/seo.ts`），
  自动写入 `useSeoMeta` + `link[rel=canonical]`（基于 `NUXT_PUBLIC_SITE_URL`）。
- `layouts/default.vue` 根据 `useI18n().locale` 动态设置 `<html lang>`。
- `public/robots.txt` 指向 `public/sitemap.xml`。
- 关键页面走 **SSR**（默认）；如需 **SSG**，用 `pnpm generate` 全量预渲染。

---

## 十、后续可优化

- 若接口稳定，`sitemap.xml` 改为运行时生成（引入 `@nuxtjs/sitemap`）。
- 接入图片 CDN，`@nuxt/image` 通过 `providers` 走自有 OSS。
- 引入 `Vitest` + `@nuxt/test-utils` 做组件测试。
- Lighthouse 目标：Performance ≥ 90、SEO ≥ 95、Best Practices ≥ 95。
- 视需要新建 `composables/`、`stores/`、`middleware/`、`plugins/`、`server/api/` 等目录。
