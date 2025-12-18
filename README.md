# AI-Notes 智能笔记系统

一个基于 AIGC 技术开发的智能笔记管理应用，支持 AI 智能问答功能。

## 📖 项目文档

完整的项目文档请查看 [docs 目录](./docs/README.md)，包括：

- 📋 [需求文档](./docs/01-需求文档.md) - 详细的功能和非功能需求说明
- 🏗️ [概要设计文档](./docs/02-概要设计文档.md) - 系统架构和技术栈选择
- 🔧 [详细设计文档](./docs/03-详细设计文档.md) - 数据库、API 和组件的详细设计
- 📝 [编程实践总结报告](./docs/04-编程实践总结报告.md) - AIGC 辅助编程的实践经验总结

**文档总量**: 52,000+ 字，114+ 页

## ✨ 核心特性

- 🔐 **用户认证**: 基于 Supabase 的安全认证系统
- 📝 **笔记管理**: 创建、编辑、查看、删除笔记，支持实时自动保存
- 🤖 **AI 智能问答**: 基于 DeepSeek 的智能问答，可以回答关于所有笔记的问题
- 🔍 **智能搜索**: 模糊搜索快速定位笔记
- 🎨 **现代化 UI**: 响应式设计，支持明亮/暗黑主题
- ⚡ **高性能**: 基于 Next.js 15 的 SSR 和 Server Components

## 🛠️ 技术栈

### 核心框架
- **Next.js 15.4.2** - React 全栈框架
- **React 19.1.0** - UI 库
- **TypeScript 5.x** - 类型安全

### 样式和 UI
- **Tailwind CSS 4.x** - 实用优先的 CSS 框架
- **Radix UI** - 无障碍访问的 UI 组件库
- **Lucide React** - 现代图标库

### 后端和数据
- **Prisma 6.12.0** - 类型安全的 ORM
- **PostgreSQL** - 关系型数据库
- **Supabase** - 认证和数据库托管

### AI 服务
- **DeepSeek API** - 大语言模型服务
- **OpenAI SDK** - API 客户端

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/lwuhaolin/AI-notes.git
cd AI-notes
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 配置环境变量

创建 `.env.local` 文件并配置以下环境变量：

```env
# 数据库连接
DATABASE_URL="postgresql://..."

# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."

# DeepSeek API 密钥
AI_API_KEY="your-deepseek-api-key"
```

### 4. 初始化数据库

```bash
pnpm dlx prisma generate
pnpm dlx prisma migrate dev
```

### 5. 启动开发服务器

```bash
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📦 项目结构

```
AI-notes/
├── docs/                    # 项目文档
│   ├── 01-需求文档.md
│   ├── 02-概要设计文档.md
│   ├── 03-详细设计文档.md
│   ├── 04-编程实践总结报告.md
│   └── README.md           # 文档索引
├── src/
│   ├── app/                # Next.js App Router 页面
│   ├── components/         # React 组件
│   ├── actions/            # Server Actions
│   ├── auth/               # 认证模块
│   ├── db/                 # 数据库 (Prisma)
│   ├── openai/             # AI 服务
│   ├── lib/                # 工具函数
│   ├── hooks/              # 自定义 Hooks
│   └── styles/             # 全局样式
├── public/                 # 静态资源
└── package.json
```

## 🎯 主要功能

### 用户认证
- 使用 Supabase Auth 进行用户认证
- 支持邮箱登录和注册
- 安全的会话管理

### 笔记管理
- 创建和编辑笔记
- 实时自动保存（防抖 1 秒）
- 模糊搜索笔记内容
- 按时间排序显示

### AI 智能问答
- 基于用户所有笔记内容进行智能问答
- 支持多轮对话，维护上下文
- HTML 格式化显示，支持富文本
- 使用 DeepSeek API 提供强大的中文理解能力

### UI/UX
- 响应式设计，支持多种设备
- 明亮/暗黑主题切换
- 流畅的动画和过渡效果
- 清晰的加载状态提示

## 🧪 开发命令

```bash
# 开发
pnpm dev              # 启动开发服务器

# 构建
pnpm build            # 构建生产版本
pnpm start            # 启动生产服务器

# 代码质量
pnpm lint             # 运行 ESLint

# 数据库
pnpm migrate          # 运行数据库迁移
```

## 📚 学习资源

- [Next.js 文档](https://nextjs.org/docs) - 学习 Next.js 特性和 API
- [React 文档](https://react.dev/) - 学习 React
- [Prisma 文档](https://www.prisma.io/docs) - 学习 Prisma ORM
- [Tailwind CSS 文档](https://tailwindcss.com/docs) - 学习 Tailwind CSS
- [项目详细文档](./docs/README.md) - 查看完整的项目文档

## 🤖 关于 AIGC

本项目是使用 AIGC（AI Generated Content）工具辅助开发的完整应用系统：

- ✅ **需求分析**: AI 辅助生成需求文档
- ✅ **系统设计**: AI 协助架构设计和技术选型
- ✅ **代码实现**: GitHub Copilot 辅助编码（效率提升 60%+）
- ✅ **问题解决**: ChatGPT/Claude 协助调试和优化
- ✅ **文档编写**: AI 辅助生成技术文档（52,000+ 字）

**详细的 AIGC 实践经验** 请查看 [编程实践总结报告](./docs/04-编程实践总结报告.md)。

## 📈 项目统计

- **代码行数**: 2,000+
- **组件数量**: 15+
- **文档字数**: 52,000+
- **开发周期**: 15 天
- **效率提升**: 60%+ (相比传统开发)

## 🤝 贡献

欢迎贡献代码、报告问题或提出改进建议！

## 📄 许可证

本项目遵循相应的开源协议。

## 🔗 相关链接

- [项目仓库](https://github.com/lwuhaolin/AI-notes)
- [问题反馈](https://github.com/lwuhaolin/AI-notes/issues)
- [完整文档](./docs/README.md)

---

**使用 AIGC 技术驱动的智能笔记应用** 🚀✨
