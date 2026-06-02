"use client";

import { useEffect, useState } from "react";
import { MOCK_USER, MOCK_ROADMAP, MOCK_SCHEDULE, MOCK_ORGANIZATIONS, MOCK_COACHES, MOCK_SKILLS, MOCK_NOTIFICATIONS } from "@/lib/mock-data";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [tasksToday, setTasksToday] = useState<number[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] flex-col gap-4">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground animate-pulse text-sm">Đang tải lộ trình cá nhân hoá...</p>
      </div>
    );
  }

  const currentPhase = MOCK_ROADMAP.phases.find((p) => p.status === "in-progress");
  const enrolledSkills = MOCK_SKILLS.filter((s) => MOCK_USER.skills.includes(s.id));
  const myCoaches = MOCK_COACHES.filter((c) =>
    c.linkedSkills.some((s) => MOCK_USER.skills.includes(s))
  ).slice(0, 2);

  const toggleTask = (taskId: number) => {
    setTasksToday((prev) =>
      prev.includes(taskId) ? prev.filter((t) => t !== taskId) : [...prev, taskId]
    );
  };

  const taskTypeColor: Record<string, string> = {
    study: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
    coaching: "bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300",
    task: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 lg:pb-0">

      {/* ── Welcome Header ── */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Xin chào 👋</p>
          <h1 className="text-3xl font-extrabold tracking-tight">{MOCK_USER.name.split(" ").slice(-1)[0]}</h1>
          <p className="text-muted-foreground mt-1">Mục tiêu: <span className="text-foreground font-medium">{MOCK_USER.goal}</span></p>
        </div>
        <div className="flex items-center gap-3">
          {/* Streak */}
          <div className="flex flex-col items-center bg-card border border-border rounded-2xl px-4 py-3 shadow-sm">
            <span className="text-2xl">🔥</span>
            <span className="text-xl font-extrabold text-orange-500">{MOCK_USER.streak}</span>
            <span className="text-xs text-muted-foreground">Ngày liên tiếp</span>
          </div>
          {/* Progress */}
          <div className="flex flex-col items-center bg-card border border-border rounded-2xl px-4 py-3 shadow-sm">
            <span className="text-2xl">✅</span>
            <span className="text-xl font-extrabold text-emerald-500">{MOCK_USER.completedTasks}</span>
            <span className="text-xs text-muted-foreground">Task hoàn thành</span>
          </div>
          {/* Overall progress */}
          <div className="hidden sm:flex flex-col items-center bg-card border border-border rounded-2xl px-5 py-3 shadow-sm min-w-[110px]">
            <span className="text-2xl font-extrabold text-primary">{MOCK_USER.progress}%</span>
            <div className="w-full h-1.5 bg-muted rounded-full mt-1.5 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full transition-all duration-1000" style={{ width: `${MOCK_USER.progress}%` }} />
            </div>
            <span className="text-xs text-muted-foreground mt-1">Tiến độ tổng</span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Left: Main content ── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Enrolled Skills */}
          <section className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Kỹ năng đang học</h2>
              <a href="/dashboard/skills" className="text-sm text-primary hover:underline font-medium flex items-center gap-1">
                Khám phá thêm
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {enrolledSkills.map((skill) => (
                <a key={skill.id} href="/dashboard/roadmap" className={`flex items-center gap-3 p-4 rounded-xl border ${skill.borderColor} ${skill.bgColor} hover:scale-[1.02] transition-all cursor-pointer group`}>
                  <span className="text-2xl">{skill.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-sm ${skill.textColor}`}>{skill.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${skill.color} rounded-full`} style={{ width: "35%" }} />
                      </div>
                      <span className={`text-xs font-medium ${skill.textColor}`}>35%</span>
                    </div>
                  </div>
                  <svg className={`w-4 h-4 ${skill.textColor} opacity-0 group-hover:opacity-100 transition-opacity`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
              <a href="/dashboard/skills" className="flex items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-border text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors text-sm font-medium">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Thêm kỹ năng mới
              </a>
            </div>
          </section>

          {/* Current Phase */}
          {currentPhase && (
            <section className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Giai đoạn hiện tại</h2>
                <span className="text-xs font-bold px-2.5 py-1 bg-primary text-primary-foreground rounded-full">Đang học</span>
              </div>
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <h3 className="font-bold text-primary mb-3">{currentPhase.title}</h3>
                <div className="space-y-2">
                  {currentPhase.tasks.map((task) => {
                    const done = tasksToday.includes(task.id);
                    return (
                      <div
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border ${
                          done ? "bg-primary/10 border-primary/30" : "bg-background border-border hover:border-primary/30"
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                          done ? "bg-primary border-primary" : "border-muted-foreground"
                        }`}>
                          {done && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className={`text-sm font-medium flex-1 ${done ? "line-through text-muted-foreground" : ""}`}>
                          {task.title}
                        </span>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded uppercase tracking-wide">
                          {task.type}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <a href="/dashboard/roadmap" className="mt-4 flex items-center justify-center gap-1.5 text-sm text-primary font-medium hover:underline">
                Xem toàn bộ lộ trình
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </section>
          )}

          {/* Upcoming Schedule */}
          <section className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Lịch sắp tới</h2>
              <a href="/dashboard/schedule" className="text-sm text-primary hover:underline font-medium">Xem lịch →</a>
            </div>
            <div className="space-y-3">
              {MOCK_SCHEDULE.map((day, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border group">
                  <div className="w-16 text-center flex-shrink-0">
                    <p className="text-xs font-medium text-muted-foreground">{day.day}</p>
                    <p className="text-lg font-bold">{day.date.split("/")[0]}</p>
                    <p className="text-xs text-muted-foreground">/06</p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {day.tasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between bg-background border border-border p-3 rounded-xl hover:border-primary/40 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            task.type === "coaching" ? "bg-violet-500" : task.type === "study" ? "bg-blue-500" : "bg-amber-500"
                          }`} />
                          <span className="text-sm font-medium">{task.title}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${taskTypeColor[task.type] || "bg-muted"}`}>
                            {task.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── Right: Sidebar ── */}
        <div className="space-y-6">

          {/* AI Coach Card */}
          <section className="relative overflow-hidden bg-gradient-to-br from-primary/15 via-primary/8 to-transparent border border-primary/25 rounded-2xl p-5 shadow-sm">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-sm">Lumina AI</h3>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-muted-foreground">Đang hoạt động</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                "Chào {MOCK_USER.name.split(" ").slice(-1)[0]}! Bạn đang học rất tốt 🔥 Bạn có muốn điều chỉnh lịch học tuần này không?"
              </p>
              <a href="/dashboard/coach" className="block w-full py-2.5 text-center bg-primary text-primary-foreground font-semibold text-sm rounded-xl hover:bg-primary/90 transition-colors shadow-md shadow-primary/20">
                Trò chuyện với AI Coach
              </a>
            </div>
          </section>

          {/* My Coaches */}
          <section className="bg-card border border-border rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold">Coach của tôi</h2>
              <a href="/dashboard/coaches" className="text-xs text-primary hover:underline">Xem tất cả →</a>
            </div>
            <div className="space-y-3">
              {myCoaches.map((coach) => (
                <div key={coach.id} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/30 bg-background hover:shadow-sm transition-all cursor-pointer group">
                  <div className="relative flex-shrink-0">
                    <img src={coach.avatar} alt={coach.name} className="w-10 h-10 rounded-xl object-cover" />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-card" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{coach.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{coach.title.split("&")[0].trim()}</p>
                  </div>
                  <button className="px-2.5 py-1.5 text-xs font-semibold border border-border rounded-lg hover:border-primary/50 hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                    Đặt lịch
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Notifications */}
          <section className="bg-card border border-border rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold">Thông báo mới</h2>
              <span className="text-xs bg-red-500 text-white font-bold px-2 py-0.5 rounded-full">
                {MOCK_NOTIFICATIONS.filter(n => !n.read).length}
              </span>
            </div>
            <div className="space-y-2">
              {MOCK_NOTIFICATIONS.slice(0, 3).map((n) => {
                const icons: Record<string, string> = { reminder: "⏰", achievement: "🏆", coach: "👤" };
                return (
                  <div key={n.id} className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer hover:bg-muted/50 transition-colors ${!n.read ? "bg-primary/5" : ""}`}>
                    <span className="text-base flex-shrink-0">{icons[n.type]}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold">{n.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">{n.message}</p>
                    </div>
                    {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Partner Orgs */}
          <section className="bg-card border border-border rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold">Đối tác</h2>
              <a href="/dashboard/organizations" className="text-xs text-primary hover:underline">Xem tất cả →</a>
            </div>
            <div className="space-y-2">
              {MOCK_ORGANIZATIONS.map((org) => (
                <a key={org.id} href="/dashboard/organizations" className="flex items-center gap-3 p-3 rounded-xl border border-border bg-background hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer group">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${org.color} flex items-center justify-center text-white font-black text-xs flex-shrink-0 shadow-sm`}>
                    {org.shortName.slice(0, 3)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{org.name}</p>
                    <p className="text-xs text-muted-foreground">{org.courseCount} khóa học</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
