"use client";

import { useState, useRef, useEffect } from "react";
import { MOCK_COACH_CHAT, MOCK_USER } from "@/lib/mock-data";

const SUGGESTIONS = [
  "Điều chỉnh lịch học của tôi",
  "Tôi muốn mở giai đoạn tiếp theo",
  "Đề xuất tài liệu học tập",
  "Tóm tắt tiến độ tuần này",
];

export default function CoachPage() {
  const [messages, setMessages] = useState(MOCK_COACH_CHAT);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => { scrollToBottom(); }, [messages, loading]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;
    const newMessages = [...messages, { role: "user" as const, content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/coach/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, context: newMessages }),
      });
      const data = await response.json();
      if (data.success) {
        setMessages([...newMessages, { role: "ai" as const, content: data.reply }]);
      }
    } catch {
      setMessages([...newMessages, {
        role: "ai" as const,
        content: "Xin lỗi, tôi đang gặp sự cố kết nối. Vui lòng thử lại sau nhé!",
      }]);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto pb-20 lg:pb-0">
      <div className="h-[80vh] flex flex-col bg-card border border-border rounded-2xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">

        {/* ── Chat Header ── */}
        <div className="px-5 py-4 border-b border-border bg-gradient-to-r from-primary/10 to-transparent flex items-center gap-4 flex-shrink-0">
          <div className="relative">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-card" />
          </div>
          <div className="flex-1">
            <h2 className="font-bold">Lumina AI</h2>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Coach cá nhân của {MOCK_USER.name.split(" ").slice(-1)[0]} · Đang hoạt động
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs font-semibold border border-border rounded-lg hover:bg-muted transition-colors">
              Lịch sử
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors">
              <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Chat Messages ── */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-gradient-to-b from-background/50 to-muted/10">
          {/* Date separator */}
          <div className="flex justify-center">
            <span className="text-xs font-medium text-muted-foreground px-3 py-1 bg-card border border-border rounded-full shadow-sm">
              Hôm nay · {new Date().toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })}
            </span>
          </div>

          {messages.map((msg, idx) => {
            const isAI = msg.role === "ai";
            return (
              <div key={idx} className={`flex gap-3 ${isAI ? "justify-start" : "justify-end"}`}>
                {isAI && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5 shadow">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                )}
                <div className={`max-w-[78%] ${isAI ? "" : ""}`}>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    isAI
                      ? "bg-card border border-border text-foreground rounded-tl-sm"
                      : "bg-primary text-primary-foreground rounded-tr-sm shadow-primary/20"
                  }`}>
                    {msg.content}
                  </div>
                  <p className={`text-[10px] text-muted-foreground mt-1 ${isAI ? "text-left" : "text-right"}`}>
                    {new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                {!isAI && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                    {MOCK_USER.name.split(" ").slice(-1)[0][0]}
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing indicator */}
          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center flex-shrink-0 shadow">
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="p-4 rounded-2xl rounded-tl-sm bg-card border border-border shadow-sm flex items-center gap-1.5">
                <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          {/* Quick suggestions */}
          {messages.length <= MOCK_COACH_CHAT.length && !loading && (
            <div className="flex flex-wrap gap-2 pt-2 pl-11">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="px-3.5 py-2 text-xs font-medium border border-primary/25 bg-primary/5 text-primary rounded-full hover:bg-primary/10 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ── Input Area ── */}
        <div className="p-4 border-t border-border bg-card flex-shrink-0">
          <form
            className="flex items-end gap-2"
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          >
            <div className="flex-1 relative">
              <textarea
                rows={1}
                value={input}
                onChange={(e) => { setInput(e.target.value); e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px"; }}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                disabled={loading}
                placeholder="Nhắn tin với Lumina AI... (Enter để gửi)"
                className="w-full bg-background border border-border rounded-2xl pl-4 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all disabled:opacity-50 resize-none overflow-hidden min-h-[48px]"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-11 h-11 flex-shrink-0 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-all disabled:opacity-40 shadow-md shadow-primary/20 hover:scale-105 active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
          <p className="text-[10px] text-muted-foreground text-center mt-2">
            Lumina AI được hỗ trợ bởi Gemini · Câu trả lời mang tính tham khảo
          </p>
        </div>
      </div>
    </div>
  );
}
