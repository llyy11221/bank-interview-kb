"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function AIChat() {
  const [mode, setMode] = useState<"qa" | "mock">("qa");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mockCount, setMockCount] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (content?: string) => {
    const text = content || input;
    if (!text.trim()) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: text,
          mode,
          messages: mode === "mock" ? messages : undefined,
        }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.answer }]);
      if (mode === "mock") setMockCount((c) => c + 1);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "抱歉，请求失败，请稍后重试。" },
      ]);
    }
    setLoading(false);
  };

  const startMockInterview = () => {
    setMode("mock");
    setMessages([]);
    setMockCount(0);
    setLoading(true);
    fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: "开始面试", mode: "mock", mockCount: 0 }),
    })
      .then((r) => r.json())
      .then((data) => {
        setMessages([{ role: "assistant", content: data.answer }]);
        setMockCount(1);
      })
      .catch(() => {
        setMessages([{ role: "assistant", content: "抱歉，启动模拟面试失败。" }]);
      })
      .finally(() => setLoading(false));
  };

  const switchToQA = () => {
    setMode("qa");
    setMessages([]);
    setMockCount(0);
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">AI 面试助手</h3>
        <div className="flex gap-2">
          <Badge
            variant={mode === "qa" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={switchToQA}
          >
            普通问答
          </Badge>
          <Badge
            variant={mode === "mock" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={startMockInterview}
          >
            模拟面试
          </Badge>
        </div>
      </div>

      {mode === "mock" && messages.length === 0 && !loading && (
        <div className="text-center py-6 space-y-3">
          <p className="text-muted-foreground">点击「模拟面试」开始一场银行面试模拟练习</p>
          <Button onClick={startMockInterview}>开始模拟面试</Button>
        </div>
      )}

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg whitespace-pre-wrap ${
              msg.role === "user"
                ? "bg-primary text-primary-foreground ml-8"
                : "bg-muted mr-8"
            }`}
          >
            {msg.content}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            mode === "qa"
              ? "输入你想了解的面试问题..."
              : "回答面试官的问题..."
          }
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <Button onClick={() => sendMessage()} disabled={loading}>
          {loading ? "..." : "发送"}
        </Button>
      </div>
    </Card>
  );
}
