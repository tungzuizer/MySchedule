"use client";

import { useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────

type StepStatus = "completed" | "active" | "upcoming";

interface JourneyStep {
  id: number;
  phase: string;
  verb: string;
  title: string;
  subtitle: string;
  duration?: string;
  icon: string;
  gradientFrom: string;
  gradientTo: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  offlineBadge: string;
  description: string;
  highlights: string[];
  metrics?: { label: string; value: string; icon: string }[];
  sections?: { title: string; icon: string; items: string[] }[];
  deliverables?: string[];
  status: StepStatus;
}

// ── Data ───────────────────────────────────────────────────────────────────────

const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 1,
    phase: "BƯỚC 1",
    verb: "ASSESS",
    title: "Đánh giá Năng lực",
    subtitle: "In-Person Assessment Center",
    icon: "🎯",
    gradientFrom: "from-violet-500",
    gradientTo: "to-purple-600",
    bgColor: "bg-violet-50 dark:bg-violet-950/30",
    textColor: "text-violet-700 dark:text-violet-300",
    borderColor: "border-violet-200 dark:border-violet-800",
    offlineBadge: "📍 Trực tiếp tại trung tâm",
    description:
      "Học viên tham gia LEAD và đến trung tâm đánh giá trực tiếp. Các chuyên gia huấn luyện chuyên nghiệp đánh giá toàn diện năng lực và xây dựng lộ trình phát triển cá nhân hoá cho từng học viên.",
    highlights: [
      "Đánh giá trực tiếp tại trung tâm",
      "Chuyên gia huấn luyện chuyên nghiệp",
      "Lộ trình phát triển cá nhân hoá",
      "Xác định điểm mạnh & khoảng cách kỹ năng",
    ],
    sections: [
      {
        title: "Tiêu chí đánh giá",
        icon: "📋",
        items: [
          "Kỹ năng giao tiếp",
          "Làm việc nhóm",
          "Giải quyết vấn đề",
          "Tiềm năng lãnh đạo",
          "Thái độ chuyên nghiệp",
          "Sẵn sàng đi làm",
        ],
      },
    ],
    status: "completed",
  },
  {
    id: 2,
    phase: "BƯỚC 2",
    verb: "DEVELOP",
    title: "Phát triển Kỹ năng",
    subtitle: "Weekly Face-to-Face Workshops",
    duration: "8 tháng",
    icon: "💪",
    gradientFrom: "from-blue-500",
    gradientTo: "to-cyan-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    textColor: "text-blue-700 dark:text-blue-300",
    borderColor: "border-blue-200 dark:border-blue-800",
    offlineBadge: "🏫 Buổi học trực tiếp hàng tuần",
    description:
      "Học viên tham dự các buổi workshop trực tiếp và phiên đào tạo thực hành hàng tuần trong 8 tháng. Khác với khoá học online, học viên chủ động luyện tập và nhận phản hồi trực tiếp từ coach.",
    highlights: [
      "Workshop trực tiếp hàng tuần",
      "Thực hành & phản hồi tức thì từ coach",
      "Học theo nhóm nhỏ chuyên sâu",
      "Khác biệt hoàn toàn với khoá học online",
    ],
    sections: [
      {
        title: "Kỹ năng được đào tạo",
        icon: "📚",
        items: [
          "Giao tiếp hiệu quả",
          "Làm việc nhóm",
          "Tư duy phản biện",
          "Thuyết trình (Public Speaking)",
          "Tranh biện (Debate)",
          "Nghiên cứu & phân tích",
          "Lãnh đạo",
          "Quản lý dự án",
          "Kỹ năng nghề nghiệp chuyên nghiệp",
        ],
      },
    ],
    status: "active",
  },
  {
    id: 3,
    phase: "BƯỚC 3",
    verb: "INSPIRE",
    title: "Truyền cảm hứng",
    subtitle: "Offline Events & Community",
    icon: "🌟",
    gradientFrom: "from-amber-500",
    gradientTo: "to-orange-500",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    textColor: "text-amber-700 dark:text-amber-300",
    borderColor: "border-amber-200 dark:border-amber-800",
    offlineBadge: "🎤 Sự kiện offline hàng tháng",
    description:
      "Hàng tháng, LEAD tổ chức các sự kiện offline với doanh nhân, lãnh đạo doanh nghiệp, chuyên gia ngành và những người thành công. Học viên có thể đặt câu hỏi trực tiếp, xây dựng mạng lưới quan hệ chuyên nghiệp và học hỏi từ những hành trình sự nghiệp thực tế.",
    highlights: [
      "Đặt câu hỏi trực tiếp với diễn giả",
      "Xây dựng mạng lưới quan hệ chuyên nghiệp",
      "Học từ hành trình sự nghiệp thực tế",
      "Định hướng nghề nghiệp & động lực",
    ],
    sections: [
      {
        title: "Sự kiện học thuật",
        icon: "🎤",
        items: [
          "Diễn giả khách mời hàng tháng",
          "Hỏi đáp trực tiếp với chuyên gia",
          "Networking chuyên nghiệp",
          "Chia sẻ hành trình nghề nghiệp thực tế",
        ],
      },
      {
        title: "Hoạt động gắn kết",
        icon: "🏕️",
        items: [
          "Leadership Camps",
          "Team Building Activities",
          "Community Projects",
          "Outdoor Challenges",
        ],
      },
    ],
    status: "upcoming",
  },
  {
    id: 4,
    phase: "BƯỚC 4",
    verb: "EXPERIENCE",
    title: "Trải nghiệm Thực chiến",
    subtitle: "Internship at Partner Companies",
    duration: "8 tháng",
    icon: "🏢",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-teal-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    textColor: "text-emerald-700 dark:text-emerald-300",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    offlineBadge: "🤝 Thực tập tại công ty đối tác",
    description:
      "Học viên được đặt vào các công ty đối tác để thực tập và tích lũy kinh nghiệm làm việc thực tế trong 8 tháng. Họ làm việc trên các dự án thực và được supervisor đánh giá trực tiếp. Học viên có được kinh nghiệm thực tế tại môi trường doanh nghiệp trước khi tốt nghiệp.",
    highlights: [
      "Làm việc trên dự án thực tế tại doanh nghiệp",
      "Được supervisor đánh giá trực tiếp",
      "Kinh nghiệm doanh nghiệp thực trước tốt nghiệp",
      "Mentor hỗ trợ liên tục suốt thực tập",
    ],
    sections: [
      {
        title: "Tiêu chí đánh giá tại doanh nghiệp",
        icon: "📊",
        items: [
          "Giao tiếp",
          "Làm việc nhóm",
          "Tinh thần trách nhiệm",
          "Chủ động & sáng tạo",
          "Chuyên nghiệp",
          "Giải quyết vấn đề",
        ],
      },
    ],
    status: "upcoming",
  },
  {
    id: 5,
    phase: "BƯỚC 5",
    verb: "LAUNCH",
    title: "Định hướng Sự nghiệp",
    subtitle: "Career Launch & Certification",
    icon: "🚀",
    gradientFrom: "from-rose-500",
    gradientTo: "to-pink-600",
    bgColor: "bg-rose-50 dark:bg-rose-950/30",
    textColor: "text-rose-700 dark:text-rose-300",
    borderColor: "border-rose-200 dark:border-rose-800",
    offlineBadge: "🎓 Chứng nhận & Định hướng sự nghiệp",
    description:
      "LEAD thu thập dữ liệu hiệu suất từ công ty, mentor và học viên. Mỗi học viên nhận được báo cáo đánh giá kỹ năng, đánh giá thực tập, chứng nhận sẵn sàng nghề nghiệp và thư giới thiệu việc làm. Những học viên cần phát triển thêm sẽ nhận hỗ trợ mentor và coaching bổ sung.",
    highlights: [
      "Báo cáo đánh giá kỹ năng chi tiết",
      "Chứng nhận Career Readiness",
      "Thư giới thiệu việc làm",
      "Coaching bổ sung cho học viên cần hỗ trợ",
    ],
    deliverables: [
      "Báo cáo đánh giá kỹ năng",
      "Đánh giá kết quả thực tập",
      "Chứng nhận Career Readiness",
      "Thư giới thiệu việc làm",
    ],
    metrics: [
      { label: "Hoàn thành chương trình", value: "80%", icon: "🎓" },
      { label: "Đạt năng lực kỹ năng", value: "70%", icon: "⭐" },
      { label: "Được nhận thực tập", value: "60%", icon: "🏢" },
      { label: "Có việc làm / Lộ trình rõ ràng", value: "50%", icon: "🚀" },
    ],
    status: "upcoming",
  },
];

const STATUS_CONFIG: Record<StepStatus, { label: string; dotColor: string; badgeClass: string }> = {
  completed: {
    label: "Hoàn thành",
    dotColor: "bg-emerald-500",
    badgeClass: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300",
  },
  active: {
    label: "Đang diễn ra",
    dotColor: "bg-primary animate-pulse",
    badgeClass: "bg-primary text-primary-foreground",
  },
  upcoming: {
    label: "Sắp tới",
    dotColor: "bg-muted-foreground/50",
    badgeClass: "bg-muted text-muted-foreground",
  },
};

// ── Component ──────────────────────────────────────────────────────────────────

export default function JourneyPage() {
  const [activeStep, setActiveStep] = useState<number>(2);
  const selected = JOURNEY_STEPS.find((s) => s.id === activeStep)!;
  const statusCfg = STATUS_CONFIG[selected.status];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24 lg:pb-8">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-8 md:p-12 text-white shadow-2xl">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
        <div className="absolute top-0 left-0 w-[500px] h-[300px] bg-indigo-600/15 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl translate-x-1/4 translate-y-1/4 pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-extrabold uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LEAD Offline Development Journey
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-4">
            Hành trình phát triển{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
              trực tiếp
            </span>
          </h1>

          <p className="text-white/70 text-lg leading-relaxed mb-8">
            LEAD là chương trình{" "}
            <span className="text-white font-bold">hoàn toàn offline</span> — không phải khoá học online. Học viên học trực tiếp, thực hành thực chiến và nhận phản hồi ngay lập tức từ coach chuyên nghiệp, kết nối thực sự với cộng đồng và doanh nghiệp đối tác.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: "🗺️", value: "5", label: "Bước hành trình" },
              { icon: "📅", value: "16", label: "Tháng chương trình" },
              { icon: "🏫", value: "100%", label: "Học trực tiếp" },
              { icon: "🤝", value: "50%+", label: "Có việc làm / Lộ trình" },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-4 text-center">
                <span className="text-2xl block mb-1">{s.icon}</span>
                <p className="text-2xl font-extrabold">{s.value}</p>
                <p className="text-[11px] text-white/55 mt-0.5 font-medium leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5-Step Progress Selector ── */}
      <section className="relative">
        {/* Connector line behind circles */}
        <div className="absolute top-7 left-[10%] right-[10%] h-0.5 bg-border hidden sm:block" />

        <div className="grid grid-cols-5 gap-1 relative z-10">
          {JOURNEY_STEPS.map((step) => {
            const isActive = activeStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`flex flex-col items-center gap-2 transition-all duration-200 ${isActive ? "scale-110" : "hover:scale-105 opacity-70 hover:opacity-100"}`}
              >
                {/* Icon circle */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl shadow-lg border-2 transition-all duration-300 ${
                  isActive
                    ? `bg-gradient-to-br ${step.gradientFrom} ${step.gradientTo} border-transparent shadow-xl`
                    : step.status === "completed"
                    ? "bg-emerald-100 dark:bg-emerald-950/50 border-emerald-400/50 text-emerald-600"
                    : "bg-card border-border"
                }`}>
                  {step.status === "completed" && !isActive ? (
                    <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : step.icon}
                </div>
                {/* Label */}
                <div className="text-center">
                  <p className={`text-[9px] font-extrabold uppercase tracking-widest ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                    {step.phase}
                  </p>
                  <p className={`text-[11px] font-extrabold mt-0.5 ${isActive ? `${step.textColor}` : "text-muted-foreground"}`}>
                    {step.verb}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Step Detail Panel ── */}
      <section key={selected.id} className="grid grid-cols-1 lg:grid-cols-5 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">

        {/* Left — 3 cols */}
        <div className="lg:col-span-3 space-y-5">

          {/* Hero Card */}
          <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${selected.gradientFrom} ${selected.gradientTo} p-6 md:p-8 text-white shadow-xl`}>
            <div className="absolute top-0 right-0 text-[160px] leading-none opacity-[0.07] pointer-events-none select-none -translate-y-8 translate-x-4">
              {selected.icon}
            </div>

            <div className="relative z-10">
              {/* Status + offline badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur text-xs font-bold`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dotColor}`} />
                  {statusCfg.label}
                </span>
                {selected.duration && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur text-xs font-bold">
                    📅 {selected.duration}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur text-xs font-bold">
                  {selected.offlineBadge}
                </span>
              </div>

              {/* Phase + Verb */}
              <p className="text-white/50 text-xs font-extrabold uppercase tracking-widest mb-1">{selected.phase}</p>
              <div className="flex items-baseline gap-3 mb-2">
                <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">{selected.verb}</h2>
                <span className="text-white/40 font-light text-xl">·</span>
                <p className="text-lg md:text-xl font-semibold text-white/80">{selected.title}</p>
              </div>
              <p className="text-white/60 text-sm italic mb-5">{selected.subtitle}</p>
              <p className="text-white/85 text-sm leading-relaxed max-w-xl">{selected.description}</p>
            </div>
          </div>

          {/* Highlights */}
          <div className={`bg-card border ${selected.borderColor} rounded-2xl p-5 shadow-sm`}>
            <h3 className={`font-bold mb-4 flex items-center gap-2 text-sm ${selected.textColor}`}>
              ✨ Điểm nổi bật
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selected.highlights.map((h) => (
                <div key={h} className={`flex items-start gap-3 p-3 rounded-xl ${selected.bgColor} border ${selected.borderColor}`}>
                  <div className={`w-5 h-5 rounded-md bg-gradient-to-br ${selected.gradientFrom} ${selected.gradientTo} flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm`}>
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium leading-snug">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables (Step 5) */}
          {selected.deliverables && (
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
              <h3 className={`font-bold mb-4 flex items-center gap-2 text-sm ${selected.textColor}`}>
                📄 Học viên nhận được
              </h3>
              <div className="space-y-2">
                {selected.deliverables.map((d, i) => (
                  <div key={d} className={`flex items-center gap-3 p-3 rounded-xl ${selected.bgColor} border ${selected.borderColor}`}>
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-extrabold flex-shrink-0 bg-gradient-to-br ${selected.gradientFrom} ${selected.gradientTo} text-white shadow-sm`}>
                      {i + 1}
                    </span>
                    <span className="text-sm font-semibold">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Target Metrics (Step 5) */}
          {selected.metrics && (
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
              <h3 className={`font-bold mb-4 flex items-center gap-2 text-sm ${selected.textColor}`}>
                📊 Mục tiêu đầu ra chương trình
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {selected.metrics.map((m) => (
                  <div key={m.label} className={`relative p-5 rounded-2xl border ${selected.borderColor} ${selected.bgColor} text-center`}>
                    <span className="text-3xl block mb-2">{m.icon}</span>
                    <p className={`text-4xl font-extrabold ${selected.textColor}`}>{m.value}</p>
                    <p className="text-xs text-muted-foreground mt-2 font-medium leading-snug">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right — 2 cols */}
        <div className="lg:col-span-2 space-y-5">

          {/* Curriculum Sections */}
          {selected.sections?.map((section) => (
            <div key={section.title} className="bg-card border border-border rounded-2xl p-5 shadow-sm">
              <h3 className={`font-bold text-sm mb-4 flex items-center gap-2 ${selected.textColor}`}>
                <span>{section.icon}</span>
                {section.title}
              </h3>
              <div className="space-y-1.5">
                {section.items.map((item, i) => (
                  <div key={item} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/50 transition-colors">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-extrabold flex-shrink-0 bg-gradient-to-br ${selected.gradientFrom} ${selected.gradientTo} text-white shadow-sm`}>
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Step Navigator */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-xs text-muted-foreground uppercase tracking-widest mb-3">Các bước</h3>
            <div className="space-y-2">
              {JOURNEY_STEPS.map((step) => {
                const isSelected = step.id === activeStep;
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                      isSelected
                        ? `${step.bgColor} ${step.borderColor} shadow-sm`
                        : "border-transparent hover:bg-muted/60"
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 shadow-sm ${
                      isSelected
                        ? `bg-gradient-to-br ${step.gradientFrom} ${step.gradientTo} text-white`
                        : step.status === "completed"
                        ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {step.status === "completed" && !isSelected ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : step.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-[10px] font-extrabold uppercase tracking-widest ${isSelected ? step.textColor : "text-muted-foreground"}`}>
                        {step.phase} · {step.verb}
                      </p>
                      <p className={`text-sm font-semibold truncate ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                        {step.title}
                      </p>
                    </div>
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${STATUS_CONFIG[step.status].dotColor}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* AI Coach CTA */}
          <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-blue-500/5 to-transparent border border-primary/20 rounded-2xl p-5 shadow-sm">
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-md mb-3">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="font-bold mb-1 text-sm">Hỏi Lumina AI về hành trình</p>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                AI Coach sẵn sàng giải đáp thắc mắc về từng bước trong hành trình LEAD offline của bạn.
              </p>
              <a
                href="/dashboard/coach"
                className="block w-full py-2.5 text-center bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:bg-primary/90 transition-all shadow-md shadow-primary/20 hover:scale-[1.02] active:scale-95"
              >
                Trò chuyện với Lumina AI →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Full Timeline ── */}
      <section className="space-y-4">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-extrabold tracking-tight whitespace-nowrap">Toàn bộ hành trình</h2>
          <div className="flex-1 h-px bg-border" />
          <span className="text-sm text-muted-foreground font-medium whitespace-nowrap">16 tháng · Hoàn toàn offline</span>
        </div>

        <div className="relative">
          {/* Spine */}
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-violet-500 via-blue-500 via-amber-400 via-emerald-500 to-rose-500 hidden md:block" />

          <div className="space-y-3">
            {JOURNEY_STEPS.map((step) => {
              const isSelected = step.id === activeStep;
              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className="relative md:pl-16 cursor-pointer group"
                >
                  {/* Timeline node */}
                  <div className={`absolute left-3.5 top-5 w-5 h-5 rounded-full border-4 border-background z-10 hidden md:flex items-center justify-center transition-all ${
                    step.status === "completed"
                      ? "bg-emerald-500 shadow-lg shadow-emerald-500/30"
                      : step.status === "active"
                      ? "bg-primary animate-pulse shadow-lg shadow-primary/30"
                      : "bg-muted"
                  }`} />

                  <div className={`flex items-center gap-4 p-4 rounded-2xl border transition-all group-hover:shadow-md ${
                    isSelected
                      ? `${step.bgColor} ${step.borderColor} shadow-sm`
                      : step.status === "completed"
                      ? "bg-card border-emerald-200/50 dark:border-emerald-800/30 hover:border-emerald-300/70"
                      : "bg-card border-border hover:border-primary/30"
                  }`}>
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 shadow-md bg-gradient-to-br ${step.gradientFrom} ${step.gradientTo} text-white`}>
                      {step.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <span className={`text-[10px] font-extrabold uppercase tracking-widest ${step.textColor}`}>
                          {step.phase}
                        </span>
                        <span className={`text-[10px] font-extrabold uppercase tracking-widest ${step.textColor} opacity-60`}>
                          {step.verb}
                        </span>
                        {step.duration && (
                          <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground font-semibold">
                            {step.duration}
                          </span>
                        )}
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${STATUS_CONFIG[step.status].badgeClass}`}>
                          {STATUS_CONFIG[step.status].label}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm leading-snug">{step.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{step.offlineBadge}</p>
                    </div>

                    {/* Arrow */}
                    <svg className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${isSelected ? `${step.textColor} rotate-90` : "text-muted-foreground group-hover:translate-x-1"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Bottom Banner ── */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-8 md:p-12 text-white text-center shadow-2xl">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-4xl mb-4">🎓</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3 leading-tight">
            LEAD là chương trình offline.
          </h2>
          <p className="text-white/65 text-lg leading-relaxed mb-8">
            Không phải khoá học trực tuyến — học viên học trực tiếp, thực hành thực chiến, được phản hồi ngay lập tức và kết nối thật sự với doanh nghiệp đối tác để bước vào thị trường lao động một cách tự tin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/dashboard/roadmap"
              className="px-8 py-3.5 bg-white text-slate-900 font-extrabold rounded-2xl hover:bg-white/90 transition-all hover:scale-105 active:scale-95 shadow-xl"
            >
              Xem lộ trình của tôi →
            </a>
            <a
              href="/dashboard/coaches"
              className="px-8 py-3.5 bg-white/10 backdrop-blur border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-all hover:scale-105 active:scale-95"
            >
              Gặp gỡ Coach
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
