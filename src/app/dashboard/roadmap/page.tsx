"use client";

import { useState } from "react";
import { MOCK_ROADMAP, MOCK_COACHES, MOCK_SKILLS } from "@/lib/mock-data";

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState(MOCK_ROADMAP);
  const [reviewPhase, setReviewPhase] = useState<number | null>(null);

  const skill = MOCK_SKILLS.find((s) => s.id === roadmap.skillId);
  const coach = skill ? MOCK_COACHES.find((c) => c.id === skill.coachId) : null;

  const totalTasks = roadmap.phases.reduce((s, p) => s + p.tasks.length, 0);
  const completedTasks = roadmap.phases
    .filter((p) => p.status === "completed")
    .reduce((s, p) => s + p.tasks.length, 0);
  const overallProgress = Math.round((completedTasks / totalTasks) * 100);

  const toggleTask = (phaseId: number, taskId: number) => {
    setRoadmap((prev) => {
      const newPhases = prev.phases.map((phase) => {
        if (phase.id === phaseId) {
          const newTasks = phase.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !(task as any).completed } : task
          );
          const allDone = newTasks.every((t) => (t as any).completed);
          return {
            ...phase,
            tasks: newTasks,
            status: allDone ? "completed" : phase.status === "locked" ? "locked" : "in-progress",
          };
        }
        return phase;
      });
      return { ...prev, phases: newPhases };
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 lg:pb-0">

      {/* ── Header ── */}
      <section className="text-center space-y-4">
        {skill && (
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${skill.bgColor} ${skill.textColor} text-sm font-semibold`}>
            <span>{skill.icon}</span>
            {skill.title}
          </div>
        )}
        <h1 className="text-4xl font-extrabold tracking-tight">{roadmap.title}</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Lộ trình cá nhân hoá được tạo bởi AI dựa trên mục tiêu, trình độ và thời gian rảnh của bạn.
        </p>

        {/* Overall Progress Bar */}
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Tiến độ tổng thể</span>
            <span className="font-bold text-primary">{overallProgress}%</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${skill?.color || "from-primary to-blue-500"} rounded-full transition-all duration-1000`}
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{completedTasks}/{totalTasks} nhiệm vụ hoàn thành</span>
            <span>{roadmap.phases.length} giai đoạn</span>
          </div>
        </div>
      </section>

      {/* ── Coach Banner ── */}
      {coach && (
        <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-2xl shadow-sm">
          <img src={coach.avatar} alt={coach.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-bold">{coach.name}</p>
            <p className="text-sm text-muted-foreground">{coach.title}</p>
          </div>
          <a href="/dashboard/coaches" className="flex-shrink-0 px-4 py-2 text-sm font-semibold border border-primary/30 text-primary bg-primary/5 rounded-xl hover:bg-primary/10 transition-colors">
            Đặt lịch tư vấn
          </a>
        </div>
      )}

      {/* ── Phases Timeline ── */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary via-primary/30 to-muted hidden md:block" />

        <div className="space-y-8">
          {roadmap.phases.map((phase, index) => {
            const isCompleted = phase.status === "completed";
            const isInProgress = phase.status === "in-progress";
            const isLocked = phase.status === "locked";

            return (
              <div key={phase.id} className="relative md:pl-16">
                {/* Timeline Node */}
                <div className={`absolute left-3.5 top-6 w-5 h-5 rounded-full border-4 border-background z-10 hidden md:flex items-center justify-center transition-all
                  ${isCompleted ? "bg-emerald-500 shadow-lg shadow-emerald-500/30" : isInProgress ? "bg-primary animate-pulse shadow-lg shadow-primary/30" : "bg-muted"}`}
                >
                  {isCompleted && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                <div className={`bg-card border rounded-2xl overflow-hidden shadow-sm transition-all duration-300
                  ${isInProgress ? "border-primary/50 shadow-primary/10 shadow-md" : isCompleted ? "border-emerald-500/30" : "border-border"}`}
                >
                  {/* Phase Header */}
                  <div className={`p-5 border-b ${isInProgress ? "bg-primary/5 border-primary/20" : isCompleted ? "bg-emerald-500/5 border-emerald-500/20" : "border-border"}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-bold uppercase tracking-wider ${
                            isCompleted ? "text-emerald-600 dark:text-emerald-400" :
                            isInProgress ? "text-primary" : "text-muted-foreground"
                          }`}>
                            Giai đoạn {index + 1}
                          </span>
                          {isCompleted && phase.completedDate && (
                            <span className="text-xs text-muted-foreground">· Hoàn thành {(phase as any).completedDate}</span>
                          )}
                        </div>
                        <h2 className={`text-xl font-bold ${isInProgress ? "text-primary" : ""}`}>
                          {phase.title}
                        </h2>
                      </div>
                      <div className="flex-shrink-0">
                        {isCompleted && (
                          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-full">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            Hoàn thành
                          </span>
                        )}
                        {isInProgress && (
                          <span className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                            Đang học
                          </span>
                        )}
                        {isLocked && (
                          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-muted text-muted-foreground text-xs font-bold rounded-full">
                            🔒 Chưa mở
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Tasks */}
                  <div className="p-5 space-y-3">
                    {phase.tasks.map((task) => {
                      const taskDone = (task as any).completed || isCompleted;
                      return (
                        <div
                          key={task.id}
                          onClick={() => !isLocked && toggleTask(phase.id, task.id)}
                          className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                            isLocked
                              ? "bg-muted/30 opacity-60 cursor-not-allowed border-border"
                              : taskDone
                              ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 cursor-pointer"
                              : "bg-background border-border cursor-pointer hover:border-primary/40 hover:shadow-sm"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                              taskDone ? "bg-emerald-500 border-emerald-500" : "border-muted-foreground"
                            }`}>
                              {taskDone && (
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span className={`font-medium text-sm ${taskDone ? "line-through text-muted-foreground" : ""}`}>
                              {task.title}
                            </span>
                          </div>
                          <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-lg uppercase tracking-wide flex-shrink-0">
                            {task.type}
                          </span>
                        </div>
                      );
                    })}

                    {/* Phase Review CTA (after completed) */}
                    {isCompleted && (
                      <div className="mt-4 p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">🎉</span>
                          <div className="flex-1">
                            <p className="font-bold text-sm text-emerald-700 dark:text-emerald-300">Bạn đã hoàn thành giai đoạn này!</p>
                            <p className="text-xs text-muted-foreground mt-0.5">Hãy trò chuyện với coach để review và mở giai đoạn tiếp theo</p>
                          </div>
                          <a href="/dashboard/coach" className="flex-shrink-0 px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-colors">
                            Review →
                          </a>
                        </div>
                      </div>
                    )}

                    {isInProgress && (
                      <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-xl flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold">Gợi ý từ AI Coach</p>
                          <p className="text-xs text-muted-foreground">Hoàn thành tất cả nhiệm vụ để mở giai đoạn tiếp theo</p>
                        </div>
                        <a href="/dashboard/coach" className="text-xs text-primary font-semibold hover:underline flex-shrink-0">
                          Hỏi AI →
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Add another skill ── */}
      <div className="text-center p-8 border border-dashed border-border rounded-2xl">
        <p className="text-muted-foreground mb-3">Muốn phát triển thêm kỹ năng khác?</p>
        <a href="/dashboard/skills" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-md shadow-primary/20 hover:scale-105 active:scale-95">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Khám phá kỹ năng mới
        </a>
      </div>
    </div>
  );
}
