# JUNNYOfficial Blog

> 一个以神经科学为核心的极简静态博客。

🔗 **在线访问**：[https://junnyofficial.github.io/Blog/](https://junnyofficial.github.io/Blog/)

---

## 简介

这是一个基于极简视觉风格设计的个人博客静态网站。使用纯白、纯黑与灰色系构建全部视觉层次，拒绝阴影、渐变与过度装饰，让内容本身成为阅读的主角。

博客围绕神经科学研究展开，涵盖论文笔记、实验日志、日常思考与资料整理。

---

## 设计风格

- **配色**：白 `#ffffff` / 黑 `#111111` / 灰阶层次 `#424242` → `#9a9a9a` → `#e5e5e5`
- **布局**：圆角卡片系统（`28px–32px`）+ 极细边框（`1px`）+ 大量留白
- **动效**：仅保留最克制的 `border-color` / `transform` 过渡（`0.2s ease`）
- **响应式**：`840px` 与 `600px` 双断点，移动端自动切换单列
- **理念**：视觉静默，内容优先

---

## 页面结构

| 页面 | 路径 | 说明 |
|---|---|---|
| 首页 | `index.html` | 文章列表、个人简介、论文笔记、日常日志、专题卡片、社交链接 |
| 文章详情 | `article.html?id={id}` | 单篇文章阅读，含分享功能与推荐阅读 |
| 论文库 | `notes.html` | 全部论文笔记，支持按期刊分类过滤（Nature Neuroscience / Reviews / 主刊） |
| 日常记录 | `daily.html` | 实验日志与研究灵感笔记 |
| 日常动态 | `daily-posts.html` | 按时间排列的动态日志与统计 |
| 关于 | `about.html` | 研究理念与个人介绍 |
| 资料库 | `library.html` | 研究博客、工具、模板与外部链接 |
| 文献数据库 | `literature.html` | 按主题分类整理的文献资料入口 |
| 飞书论文 | `papers/paper-xxx.html` | 从飞书文档自动同步生成的独立论文页面 |

---

## 技术栈

- **纯静态**：HTML5 + CSS3 + Vanilla JavaScript，零依赖
- **样式**：单文件 `styles.css`（约 920 行），全站统一视觉规范
- **数据**：`script.js` 内置文章数据，支持标签过滤、动态渲染与导航高亮
- **部署**：GitHub Actions 自动部署至 GitHub Pages

---

## 本地预览

```bash
# 克隆仓库
git clone git@github.com:JUNNYOfficial/Blog.git
cd Blog

# 方式一：直接用浏览器打开
open index.html

# 方式二：启动本地服务器（推荐）
python3 -m http.server 8000
# 然后访问 http://localhost:8000
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
│   ├── pages.yml                 # GitHub Pages 自动部署
│   └── sync-feishu.yml           # 飞书文档自动同步
├── scripts/
│   ├── sync-feishu.js            # 飞书 API 同步脚本
│   └── generate-papers.js        # 本地生成论文页面
├── papers/
│   ├── paper-001.html            # 飞书同步论文页面
│   ├── paper-002.html
│   └── ...
├── index.html                    # 首页
├── article.html                  # 文章详情页
├── notes.html                    # 论文库（支持期刊分类过滤）
├── daily.html                    # 日常记录页
├── daily-posts.html              # 日常动态页
├── about.html                    # 关于页
├── library.html                  # 资料库页
├── literature.html               # 文献数据库页
├── styles.css                    # 全局样式表
├── script.js                     # 数据与渲染逻辑
├── script-feishu.js              # 飞书论文数据文件
└── README.md                     # 本文件
```

---

## 飞书文档自动同步

博客支持从飞书云文档自动同步论文笔记：

1. 在飞书文档中按 `## 二级标题` 分隔每篇论文
2. 在仓库 **Actions** 标签页手动触发「Sync Feishu Papers」工作流
3. 或设置定时同步（默认每天凌晨 2 点）
4. 同步后的论文自动拆分为独立页面，并合并到论文库中

**需要配置的环境变量**（GitHub Secrets）：
- `FEISHU_APP_ID` — 飞书自建应用 App ID
- `FEISHU_APP_SECRET` — 飞书自建应用 App Secret
- `FEISHU_DOC_URL` — 飞书文档链接

---

## 维护

- 文章数据集中维护在 `script.js` 的 `posts` 数组中
- 新增页面时请保持统一的 `page-shell` + `topbar` + `main` + `footer` 结构
- 样式修改请在 `styles.css` 中完成，确保不影响其他页面
- 论文库数据可通过飞书同步自动生成，也可手动在 `script.js` 中添加

---

*JUNNYOfficial Blog • 2026 • 慎用色彩，善用空间*
