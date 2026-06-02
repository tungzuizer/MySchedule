"use client";

import { useState } from "react";
import { MOCK_SCHEDULE } from "@/lib/mock-data";

const DAYS = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
const DAYS_FULL = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];

const TYPE_COLORS: Record<string, string> = {
  study: "bg-blue-100 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300",
  coaching: "bg-violet-100 dark:bg-violet-950/40 border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300",
  task: "bg-amber-100 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300",
};

const TYPE_LABELS: Record<string, string> = {
  study: "Học",
  coaching: "Coaching",
  task: "Nhiệm vụ",
};

export default function SchedulePage() {
  const [view, setView] = useState<"week" | "day">("week");
  const [selectedDay, setSelectedDay] = useState(1); // Monday

  // Today is Monday (index 1) for mock
  const todayIdx = 1;

  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());

  const getDayDate = (i: number) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return d.getDate() + "/" + String(d.getMonth() + 1).padStart(2, "0");
  };

  // Map MOCK_SCHEDULE to days (by partial match)
  const getTasksForDay = (dayLabel: string) =>
    MOCK_SCHEDULE.filter((s) => {
      const map: Record<string, string> = {
        "T2": "Thứ Hai",
        "T4": "Thứ Tư",
        "T6": "Thứ Sáu",
      };
      return s.day === map[dayLabel];
    }).flatMap((s) => s.tasks);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 lg:pb-0">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Lịch trình học tập</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Tuần này · {getDayDate(0)} – {getDayDate(6)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 p-1 bg-muted rounded-xl">
            <button
              onClick={() => setView("week")}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${view === "week" ? "bg-card shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              Tuần
            </button>
            <button
              onClick={() => setView("day")}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${view === "day" ? "bg-card shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              Ngày
            </button>
          </div>
          <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-md shadow-primary/20 flex items-center gap-1.5 hover:scale-105 active:scale-95">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Thêm nhiệm vụ
          </button>
        </div>
      </div>

      {/* AI Insight Banner */}
      <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-primary/10 via-blue-500/5 to-transparent border border-primary/20 rounded-2xl">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center flex-shrink-0 shadow">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-bold text-primary mb-0.5">Lumina AI đã tối ưu lịch của bạn</p>
          <p className="text-sm text-muted-foreground">
            Bạn có 2 giờ rảnh tối Thứ Tư — AI đã tự động lên lịch buổi tư vấn với Coach Khoa. Bạn có muốn giữ nguyên không?
          </p>
          <div className="flex gap-2 mt-2">
            <button className="text-xs font-semibold px-3 py-1 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">Giữ nguyên</button>
            <button className="text-xs font-semibold px-3 py-1 border border-border rounded-lg hover:bg-muted transition-colors">Điều chỉnh</button>
          </div>
        </div>
      </div>

      {/* Week View */}
      {view === "week" && (
        <div className="grid grid-cols-7 gap-2">
          {DAYS.map((day, i) => {
            const isToday = i === todayIdx;
            const tasks = getTasksForDay(day);
            return (
              <div
                key={day}
                onClick={() => { setSelectedDay(i); setView("day"); }}
                className={`flex flex-col border rounded-2xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02] hover:shadow-md ${
                  isToday
                    ? "ring-2 ring-primary border-transparent shadow-md shadow-primary/10"
                    : "border-border hover:border-primary/30 bg-card"
                }`}
              >
                {/* Day header */}
                <div className={`text-center py-3 px-1 border-b ${
                  isToday
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/50 text-muted-foreground"
                }`}>
                  <p className={`text-xs font-bold uppercase tracking-wide ${isToday ? "text-primary-foreground/80" : ""}`}>{day}</p>
                  <p className={`text-lg font-extrabold leading-tight ${isToday ? "" : ""}`}>
                    {getDayDate(i).split("/")[0]}
                  </p>
                </div>

                {/* Tasks */}
                <div className="flex-1 p-2 space-y-1.5 min-h-[140px] bg-card">
                  {tasks.length > 0 ? (
                    tasks.map((task) => (
                      <div
                        key={task.id}
                        className={`p-2 rounded-lg border text-xs font-medium cursor-pointer transition-all hover:scale-[1.02] ${
                          TYPE_COLORS[task.type] || "bg-muted border-border"
                        }`}
                      >
                        <p className="truncate font-semibold text-[11px] leading-tight">{task.title}</p>
                        <p className="mt-0.5 opacity-75 font-normal">{task.time}</p>
                      </div>
                    ))
                  ) : (
                    <div className="h-full flex items-end justify-center pb-3 opacity-0 hover:opacity-100 transition-opacity">
                      <button className="text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
                        + Thêm
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Day View */}
      {view === "day" && (
        <div className="space-y-4">
          {/* Day selector */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {DAYS.map((day, i) => (
              <button
                key={day}
                onClick={() => setSelectedDay(i)}
                className={`flex-shrink-0 flex flex-col items-center gap-0.5 px-4 py-2.5 rounded-xl border transition-all ${
                  selectedDay === i
                    ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                    : i === todayIdx
                    ? "border-primary/40 bg-primary/5 text-primary"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                <span className="text-xs font-bold uppercase tracking-wide">{day}</span>
                <span className="text-sm font-extrabold">{getDayDate(i).split("/")[0]}</span>
                {i === todayIdx && selectedDay !== i && (
                  <span className="w-1 h-1 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>

          {/* Day tasks */}
          <div className="space-y-3">
            <h2 className="font-bold text-lg">{DAYS_FULL[selectedDay]} · {getDayDate(selectedDay)}</h2>
            {(() => {
              const tasks = getTasksForDay(DAYS[selectedDay]);
              if (tasks.length === 0) {
                return (
                  <div className="text-center py-16 border border-dashed border-border rounded-2xl">
                    <p className="text-4xl mb-3">🌿</p>
                    <p className="font-semibold text-muted-foreground">Không có nhiệm vụ nào</p>
                    <p className="text-sm text-muted-foreground mt-1">Ngày nghỉ ngơi và nạp năng lượng!</p>
                    <button className="mt-4 px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors">
                      + Thêm nhiệm vụ
                    </button>
                  </div>
                );
              }
              return tasks.map((task) => (
                <div key={task.id} className={`flex items-center gap-4 p-5 border rounded-2xl transition-all hover:shadow-md ${TYPE_COLORS[task.type] || "bg-card border-border"}`}>
                  <div className="text-center flex-shrink-0">
                    <p className="text-lg font-extrabold">{task.time}</p>
                    <p className="text-xs opacity-70">{task.duration} phút</p>
                  </div>
                  <div className="w-px h-10 bg-current opacity-20 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-bold">{task.title}</p>
                    <span className="text-xs font-semibold opacity-70 uppercase tracking-wide">
                      {TYPE_LABELS[task.type] || task.type}
                    </span>
                  </div>
                  <button className="flex-shrink-0 w-8 h-8 rounded-xl border border-current/20 bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                </div>
              ));
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
