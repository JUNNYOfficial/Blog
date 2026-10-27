# zhilinOfficial Blog

> 一个以神经科学为核心的极简静态博客。

🔗 **在线访问**：[https://junnyofficial.github.io/Blog/](https://junnyofficial.github.io/Blog/)
📦 **仓库地址**：[https://github.com/JUNNYOfficial/Blog](https://github.com/JUNNYOfficial/Blog)

---

## 简介

这是一个基于极简视觉风格设计的个人博客静态网站。使用纯白、纯黑与灰色系构建全部视觉层次，拒绝阴影、渐变与过度装饰，让内容本身成为阅读的主角。

博客围绕神经科学研究展开，涵盖论文笔记、实验日志、日常思考与资料整理。

---

## 设计风格

- **配色**：白 `#ffffff` / 黑 `#111111` / 灰阶层次 `#424242` → `#6b6b6b` → `#e5e5e5`
- **布局**：全站统一——`page-shell` 容器 + `topbar` 导航 + 圆角卡片系统（`24px–32px`）+ 极细边框（`1px`）
- **首页**：复用站内设计系统（同一套字体、导航、卡片、页脚），仅新增首屏双栏布局与 3D 大脑，项目与文章区块使用与内页一致的卡片语言
- **动效**：克制的 `border-color` / `transform` / `background-color` 过渡（`0.2s ease`）
- **响应式**：`1100px` / `900px` / `720px` 断点，移动端自动切换单列
- **暗色模式**：全站（含首页）跟随系统或手动切换，首页 3D 面板与卡片同步换色
- **理念**：视觉静默，内容优先

---

## 页面结构

| 页面 | 路径 | 说明 |
|---|---|---|
| 首页 | `index.html` | 研究档案式主页、可交互 3D 大脑模型、精选项目与最新文章 |
| 全部文章 | `articles.html` | 浏览全部文章，按发布时间倒序排列 |
| 文章详情 | `article.html?id={id}` | 单篇文章阅读，含分享功能与推荐阅读 |
| 搜索 | `search.html` | 全站文章关键词搜索 |
| 关于 | `about.html` | 研究理念、项目经历与个人介绍 |
| 联系 | `contact.html` | 联系方式与社交链接 |
| 合作 | `cooperate.html` | 合作方向与联系方式 |
| 项目展示 | `project-residual-trigger.html` | 残差触发数据采集项目介绍 |
| 论文详情 | `papers/paper-001.html` ~ `paper-014.html` | 14 篇独立论文笔记页面 |
| 外链跳转提示 | `redirect.html` | 离开本站前的中间确认页 |
| 404 | `404.html` | 页面未找到提示 |

---

## 技术栈

- **纯静态**：HTML5 + CSS3 + Vanilla JavaScript；首页使用本地托管的 Three.js 与真实 OpenNeuro 脑图谱 GLB 网格，支持拖动、缩放、自动旋转与暂停
- **样式**：单文件 `styles.css`（约 3,858 行），全站统一视觉规范
- **数据**：`posts.json` 为文章数据源，`posts-data.js` 由其生成并挂载到 `window.POSTS_DATA`
- **交互**：`script.js`（约 1,000 行）负责渲染、标签过滤、搜索与导航高亮；`page-transition.js` 提供页面转场
- **部署**：GitHub Actions 自动部署至 GitHub Pages

---

## 内容数据

全站共 **19 篇文章**，分类统计：

| 分类 | 数量 |
|---|---|
| 论文 | 28 条 |
| 日常 | 8 篇 |
| 思考 | 2 篇 |

> 注：`papers/` 目录下有 14 个独立论文笔记页面，其余论文笔记以文章形式存在于 `posts.json`。

---

## 本地预览

```bash
# 克隆仓库
git clone https://github.com/JUNNYOfficial/Blog.git
cd Blog

# 方式一：启动本地服务器（推荐，搜索与数据加载需通过 HTTP）
python3 -m http.server 8000
# 然后访问 http://localhost:8000

# 方式二：直接用浏览器打开
open index.html
```

---

## 部署

项目使用 **GitHub Actions** 自动部署到 GitHub Pages。

每次向 `main` 分支推送代码时，`.github/workflows/pages.yml` 会自动触发构建与部署，无需手动操作。

部署状态可在仓库的 **Actions** 标签页查看。

---

## 项目结构

```
Blog/
├── .github/workflows/
│   └── pages.yml                 # GitHub Pages 自动部署
├── papers/
│   ├── paper-001.html            # 论文笔记页面
│   ├── paper-002.html
│   └── ...                       # 共 14 篇
├── index.html                    # 首页
├── articles.html                 # 全部文章
├── article.html                  # 文章详情页
├── search.html                   # 搜索页
├── about.html                    # 关于页
├── contact.html                  # 联系页
├── cooperate.html                # 合作页
├── project-residual-trigger.html # 项目展示页
├── redirect.html                 # 外链跳转确认页
├── 404.html                      # 404 页
├── styles.css                    # 全局样式表
├── script.js                     # 数据与渲染逻辑
├── page-transition.js            # 页面转场动画
├── home.css / home.js            # 首页专属布局与可交互 3D 大脑
├── project.css / project.js      # 项目展示页样式、阅读进度与滚动动效
├── models/                       # 本地 3D 大脑模型（含来源与许可说明）
├── vendor/                       # 本地托管的 Three.js 与 GLTF 加载器
├── posts.json                    # 文章数据源（编辑此文件）
├── posts-data.js                 # 由 posts.json 生成，请勿手动编辑
├── feed.xml                      # RSS 订阅
├── sitemap.xml                   # 站点地图
├── robots.txt                    # 爬虫规则
├── avatar.jpg                    # 站点头像
├── wechat-qr.jpg                 # 微信二维码
└── README.md                     # 本文件
```

---

## 维护

- **文章数据以 `posts.json` 为唯一数据源**，`posts-data.js` 由其生成，请勿手动编辑
- 新增页面时请保持统一的 `page-shell` + `topbar` + `main` + `footer` 结构
- 样式修改请在 `styles.css` 中完成，确保不影响其他页面
- 站点品牌名称为 `zhilinOfficial Blog`，修改时需同步更新各页面的 `<title>` 与 SEO meta

### 不纳入版本控制的文件

以下文件已在 `.gitignore` 中排除，属于本地草稿或工具产物：

- `*.docx` / `*.doc`
- `.workbuddy/`
- `八月总结-2026.md`、`恰到好处的8月总结-2026.md`

---

*zhilinOfficial Blog • 2026 • 慎用色彩，善用空间*
