# 银行面试题 AI 知识库

覆盖主流银行的面试题库 AI 知识库，支持分类浏览、搜索和 AI 问答。

## 功能

- **题库浏览**：按银行、题型、难度筛选，200+道精选题目
- **关键词搜索**：搜索题目、答案、解析
- **AI 问答**：AI 面试助手，回答你的备考问题

## 涵盖银行

国有六大行 | 股份制银行 | 代表性城商行

## 部署

### 前置条件

1. 注册 [Vercel](https://vercel.com) 账号
2. 注册 [DeepSeek](https://platform.deepseek.com) 获取 API Key（支持国内注册和支付宝充值）
3. 将代码推送到 GitHub 仓库

### 部署步骤

1. 在 GitHub 创建仓库并推送代码
2. 在 Vercel 中导入该仓库
3. 在 Vercel 项目 Settings → Environment Variables 中添加 `DEEPSEEK_API_KEY`
4. 部署，等待完成
5. 访问生成的 URL 即可使用

## 成本

- Vercel 托管：免费
- DeepSeek API：按调用次数计费（提问才计费），¥1/百万 tokens

## 本地开发

```bash
npm install
npm run dev
```
