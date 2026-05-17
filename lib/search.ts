import { Question } from "@/data/index";

export function searchQuestions(
  questions: Question[],
  query: string
): Question[] {
  if (!query.trim()) return questions;
  const q = query.toLowerCase();
  return questions.filter(
    (item) =>
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q) ||
      item.analysis.toLowerCase().includes(q)
  );
}
