"use client";

import { useQuestions } from "@/hooks/use-questions";
import { QuestionFilters } from "@/components/question-filters";
import { SearchBar } from "@/components/search-bar";
import { QuestionCard } from "@/components/question-card";
import { AIChat } from "@/components/ai-chat";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const {
    questions,
    totalCount,
    filteredCount,
    filters,
    setFilters,
    searchQuery,
    setSearchQuery,
  } = useQuestions();

  return (
    <div className="space-y-6">
      <AIChat />

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">题库</h2>
          <p className="text-sm text-muted-foreground">
            显示 {filteredCount} / {totalCount} 题
          </p>
        </div>

        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <QuestionFilters filters={filters} onChange={setFilters} />

        {questions.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            没有找到匹配的题目，请调整筛选条件
          </p>
        ) : (
          <div className="space-y-3">
            {questions.map((q) => (
              <QuestionCard key={q.id} question={q} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
