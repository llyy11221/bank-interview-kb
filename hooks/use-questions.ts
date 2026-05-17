"use client";

import { useState, useMemo } from "react";
import { allQuestions, Question } from "@/data/index";
import { filterQuestions, FilterState } from "@/lib/filter";
import { searchQuestions } from "@/lib/search";

export function useQuestions() {
  const [filters, setFilters] = useState<FilterState>({
    banks: [],
    categories: [],
    difficulties: [],
  });
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    const byFilter = filterQuestions(allQuestions, filters);
    return searchQuestions(byFilter, searchQuery);
  }, [filters, searchQuery]);

  return {
    questions: filtered,
    totalCount: allQuestions.length,
    filteredCount: filtered.length,
    filters,
    setFilters,
    searchQuery,
    setSearchQuery,
  };
}
