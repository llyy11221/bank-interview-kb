"use client";

import { Input } from "@/components/ui/input";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder }: Props) {
  return (
    <Input
      placeholder={placeholder || "搜索题目、答案、解析..."}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full"
    />
  );
}
