import { NextResponse } from "next/server";
import OpenAI from "openai";

function getClient() {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new Error("DEEPSEEK_API_KEY 未设置，请在 Netlify 环境变量中添加");
  }
  return new OpenAI({
    apiKey,
    baseURL: "https://api.deepseek.com",
  });
}

export async function POST(request: Request) {
  try {
    const { question } = await request.json();

    if (!question) {
      return NextResponse.json(
        { error: "请提供问题" },
        { status: 400 }
      );
    }

    const client = getClient();

    const systemPrompt = `你是一位银行面试辅导专家。你拥有丰富的银行招聘面试经验，涵盖国有六大行、股份制银行、城商行等。

请根据用户的问题提供准确、实用的回答。回答应：
1. 给出直接答案或解题思路
2. 适当补充相关知识点
3. 保持专业且易懂

注意：如果用户询问题目答案，请给出明确的参考答案和解析。`;

    const completion = await client.chat.completions.create({
      model: "deepseek-chat",
      max_tokens: 1500,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question },
      ],
    });

    const answer = completion.choices[0]?.message?.content || "";

    return NextResponse.json({ answer });
  } catch (error) {
    const message = error instanceof Error ? error.message : "请求失败，请稍后重试";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
