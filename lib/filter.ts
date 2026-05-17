import { Question } from "@/data/index";

export interface FilterState {
  banks: string[];
  categories: string[];
  difficulties: string[];
}

export function filterQuestions(
  questions: Question[],
  filters: FilterState
): Question[] {
  return questions.filter((q) => {
    if (filters.banks.length > 0 && !q.bank.some((b) => filters.banks.includes(b))) return false;
    if (filters.categories.length > 0 && !filters.categories.includes(q.category)) return false;
    if (filters.difficulties.length > 0 && !filters.difficulties.includes(q.difficulty)) return false;
    return true;
  });
}
