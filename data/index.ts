export interface Question {
  id: string;
  bank: string[];           // 适用银行 ["工商银行", "建设银行"]
  category: string;         // "笔试-行测" | "专业知识" | "技术专项" | "面试" | "银行特色"
  subcategory: string;      // "言语理解" | "行为面试" | "数据库SQL" 等
  difficulty: "简单" | "中等" | "困难";
  question: string;
  options?: string[] | null; // 选择题的选项
  answer: string;
  analysis: string;         // 解析
  source?: string;          // 来源说明
}

export type QuestionCategory = Question["category"];
export type QuestionDifficulty = Question["difficulty"];

import batch1 from "./questions/batch1-written.json";
import batch2 from "./questions/batch2-knowledge.json";
import batch3 from "./questions/batch3-tech.json";
import batch4 from "./questions/batch4-interview.json";
import batch5 from "./questions/batch5-bank-specific.json";

export const allQuestions: Question[] = [
  ...(batch1 as unknown as Question[]),
  ...(batch2 as unknown as Question[]),
  ...(batch3 as unknown as Question[]),
  ...(batch4 as unknown as Question[]),
  ...(batch5 as unknown as Question[]),
];

export const categories = [
  "笔试-行测", "专业知识", "技术专项", "面试", "银行特色",
] as const;

export const allBanks = [
  "中国银行", "工商银行", "建设银行", "农业银行", "交通银行", "邮储银行",
  "招商银行", "浦发银行", "中信银行", "民生银行", "兴业银行", "光大银行", "平安银行",
  "北京银行", "上海银行", "江苏银行", "宁波银行",
] as const;

export const difficulties = ["简单", "中等", "困难"] as const;
