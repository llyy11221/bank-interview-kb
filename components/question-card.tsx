"use client";

import { useState } from "react";
import { Question } from "@/data/index";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Props {
  question: Question;
}

export function QuestionCard({ question }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border rounded-lg p-4 space-y-2">
      <div className="flex flex-wrap gap-2 mb-2">
        <Badge variant="outline">{question.category}</Badge>
        <Badge variant="outline">{question.subcategory}</Badge>
        <Badge>{question.difficulty}</Badge>
        {question.bank.map((b) => (
          <Badge key={b} variant="secondary">{b}</Badge>
        ))}
      </div>
      <p className="font-medium whitespace-pre-wrap">{question.question}</p>
      {question.options && (
        <div className="space-y-1 pl-4">
          {question.options.map((opt, i) => (
            <p key={i}>{opt}</p>
          ))}
        </div>
      )}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "收起答案" : "查看答案"}
      </Button>
      {expanded && (
        <div className="border-t pt-2 space-y-1">
          <p><strong>答案：</strong>{question.answer}</p>
          <p className="text-muted-foreground"><strong>解析：</strong>{question.analysis}</p>
        </div>
      )}
    </div>
  );
}
