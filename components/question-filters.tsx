"use client";

import { allBanks, categories } from "@/data/index";
import { FilterState } from "@/lib/filter";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Props {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

export function QuestionFilters({ filters, onChange }: Props) {
  const toggleArray = (key: keyof FilterState, value: string) => {
    const current = filters[key];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: next });
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium mb-2">银行</p>
        <div className="flex flex-wrap gap-2">
          {allBanks.map((bank) => (
            <Badge
              key={bank}
              variant={filters.banks.includes(bank) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleArray("banks", bank)}
            >
              {bank}
            </Badge>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">题型</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Badge
              key={cat}
              variant={filters.categories.includes(cat) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleArray("categories", cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>
      </div>
      <Separator />
    </div>
  );
}
