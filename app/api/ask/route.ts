import { NextResponse } from "next/server";
import OpenAI from "openai";

type Role = "user" | "assistant";

interface Message {
  role: Role;
  content: string;
}

function getClient() {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new Error("DEEPSEEK_API_KEY 未设置，请在 Netlify 环境变量中添加");
  }
  return new OpenAI({ apiKey, baseURL: "https://api.deepseek.com" });
}

const qaPrompt = `你是一位银行面试辅导专家。你拥有丰富的银行招聘面试经验，涵盖国有六大行、股份制银行、城商行等。

请根据用户的问题提供准确、实用的回答。回答应：
1. 给出直接答案或解题思路
2. 适当补充相关知识点
3. 保持专业且易懂

注意：如果用户询问题目答案，请给出明确的参考答案和解析。`;

const mockPrompt = `你是一位银行面试官，正在对求职者进行银行招聘面试。你的面试涵盖以下类型：

1. 自我介绍 — 让求职者介绍自己
2. 行为面试 — 问过往经历、求职动机、职业规划等（STAR法则）
3. 情景题 — 给出银行工作中的具体场景让求职者处理
4. 无领导小组讨论风格 — 让求职者分析银行业相关问题
5. 压力题 — 适当提出有挑战性的问题

规则：
- 每次问一个问题，等用户回答后再继续
- 用户回答后，先给出简短评价（1-2句），再问下一个问题
- 评价要指出亮点和不足，不足要给出改进建议
- 如果用户回答得不好，可以追问或给一次重新回答的机会
- 面试节奏要真实，从简单到困难，先自我介绍，再行为面试，再情景题
- 如果用户说"结束面试"，就总结面试表现并给出评分（10分制）
- 全程保持专业、友善但有一定压力的面试官风格
- 首次提问时，先简单介绍自己，然后让求职者做自我介绍`;

export async function POST(request: Request) {
  try {
    const { question, mode = "qa", messages: history } = await request.json();

    if (!question) {
      return NextResponse.json({ error: "请提供问题" }, { status: 400 });
    }

    const client = getClient();
    const systemPrompt = mode === "mock" ? mockPrompt : qaPrompt;
    const msgs: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
    ];

    const isFirstMock = mode === "mock" && (!history || history.length === 0);

    if (isFirstMock) {
      msgs.push({ role: "user", content: "开始面试" });
    } else if (mode === "mock" && history) {
      history.forEach((m: Message) => {
        msgs.push({ role: m.role, content: m.content });
      });
      msgs.push({ role: "user", content: question });
    } else {
      msgs.push({ role: "user", content: question });
    }

    const completion = await client.chat.completions.create({
      model: "deepseek-chat",
      max_tokens: 1500,
      messages: msgs,
    });

    const answer = completion.choices[0]?.message?.content || "";
    return NextResponse.json({ answer });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "请求失败，请稍后重试";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
