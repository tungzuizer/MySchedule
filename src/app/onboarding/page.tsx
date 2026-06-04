"use client";

import { useState } from "react";

const SKILLS = [
  { id: "leadership", label: "Lãnh đạo & Quản lý", icon: "🏆" },
  { id: "teamwork", label: "Làm việc nhóm", icon: "🤝" },
  { id: "community", label: "Kỹ năng cộng đồng", icon: "🌱" },
  { id: "ai-tech", label: "AI & Công nghệ", icon: "🤖" },
  { id: "entrepreneurship", label: "Khởi nghiệp", icon: "🚀" },
  { id: "communication", label: "Giao tiếp chuyên nghiệp", icon: "💬" },
  { id: "product-management", label: "Quản lý Sản phẩm", icon: "📱" },
  { id: "design-thinking", label: "Tư duy Thiết kế", icon: "🎨" },
];

const LEVELS = [
  { id: "Beginner", label: "Mới bắt đầu", desc: "Chưa có kinh nghiệm" },
  { id: "Intermediate", label: "Trung cấp", desc: "Đã có nền tảng cơ bản" },
  { id: "Advanced", label: "Nâng cao", desc: "Có kinh nghiệm thực tế" },
];

const STEPS = ["Kỹ năng", "Trình độ", "Thời gian"];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState("leadership");
  const [selectedLevel, setSelectedLevel] = useState("Intermediate");
  const [timeCommitment, setTimeCommitment] = useState("10");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/roadmap/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goal: selectedSkill,
          experience: selectedLevel,
          timeCommitment,
        }),
      });
      const data = await response.json();
      if (data.success) {
        window.location.href = "/dashboard";
      } else {
        alert("Không thể tạo lộ trình. Vui lòng thử lại!");
      }
    } catch {
      // Still redirect on error for demo
      window.location.href = "/dashboard";
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <img src="/logo.png" alt="LEAD Logo" className="w-16 h-16 object-contain mb-4 drop-shadow-xl hover:scale-110 transition-transform duration-300 animate-in zoom-in duration-500" />
            <span className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">LEAD</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Tạo lộ trình của bạn ✨</h1>
          <p className="text-muted-foreground">AI sẽ tạo lộ trình cá nhân hoá phù hợp với mục tiêu và thời gian của bạn</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                i === step
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : i < step
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-muted text-muted-foreground"
              }`}>
                {i < step ? (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span>{i + 1}</span>
                )}
                {s}
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-8 h-0.5 rounded-full transition-all ${i < step ? "bg-emerald-500" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">

          {/* Step 0: Skill selection */}
          {step === 0 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-bold mb-1">Bạn muốn phát triển kỹ năng gì?</h2>
                <p className="text-sm text-muted-foreground">Chọn kỹ năng bạn muốn tập trung đầu tiên</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {SKILLS.map((skill) => (
                  <button
                    key={skill.id}
                    onClick={() => setSelectedSkill(skill.id)}
                    className={`flex items-center gap-3 p-4 border rounded-xl text-left transition-all hover:scale-[1.01] active:scale-[0.99] ${
                      selectedSkill === skill.id
                        ? "bg-primary/5 border-primary text-primary shadow-sm shadow-primary/10"
                        : "bg-background border-border hover:border-primary/40"
                    }`}
                  >
                    <span className="text-xl">{skill.icon}</span>
                    <span className="text-sm font-semibold leading-tight">{skill.label}</span>
                    {selectedSkill === skill.id && (
                      <svg className="w-4 h-4 ml-auto flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Level */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-bold mb-1">Trình độ hiện tại của bạn?</h2>
                <p className="text-sm text-muted-foreground">AI sẽ điều chỉnh độ khó phù hợp với bạn</p>
              </div>
              <div className="space-y-3">
                {LEVELS.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setSelectedLevel(level.id)}
                    className={`w-full flex items-center gap-4 p-5 border rounded-xl text-left transition-all hover:scale-[1.005] active:scale-[0.995] ${
                      selectedLevel === level.id
                        ? "bg-primary/5 border-primary shadow-sm shadow-primary/10"
                        : "bg-background border-border hover:border-primary/40"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      selectedLevel === level.id ? "border-primary bg-primary" : "border-muted-foreground"
                    }`}>
                      {selectedLevel === level.id && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <div>
                      <p className={`font-bold text-sm ${selectedLevel === level.id ? "text-primary" : ""}`}>{level.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{level.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Time commitment */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold mb-1">Bạn có bao nhiêu thời gian mỗi tuần?</h2>
                <p className="text-sm text-muted-foreground">Chúng tôi sẽ sắp xếp lịch học phù hợp</p>
              </div>

              {/* Big time display */}
              <div className="text-center py-6 bg-primary/5 border border-primary/20 rounded-xl">
                <p className="text-5xl font-extrabold text-primary">{timeCommitment}</p>
                <p className="text-muted-foreground font-medium mt-1">giờ / tuần</p>
              </div>

              <input
                type="range"
                min="1"
                max="40"
                value={timeCommitment}
                onChange={(e) => setTimeCommitment(e.target.value)}
                className="w-full accent-primary h-2 cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground font-medium">
                <span>1 giờ</span>
                <span>40 giờ</span>
              </div>

              {/* Estimate */}
              <div className="p-4 bg-muted/50 rounded-xl text-sm space-y-1">
                <p className="font-semibold">Ước tính của AI:</p>
                <p className="text-muted-foreground">
                  Với {timeCommitment} giờ/tuần, bạn có thể hoàn thành lộ trình trong khoảng{" "}
                  <strong className="text-foreground">{Math.ceil(80 / Number(timeCommitment))} tuần</strong>.
                </p>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className={`flex gap-3 mt-8 pt-6 border-t border-border ${step === 0 ? "justify-end" : "justify-between"}`}>
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-5 py-2.5 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Quay lại
              </button>
            )}

            {step < 2 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-md shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
              >
                Tiếp theo
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="flex-1 h-12 bg-gradient-to-r from-primary to-blue-600 text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    AI đang tạo lộ trình...
                  </>
                ) : (
                  <>
                    ✨ Tạo lộ trình cá nhân
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Bạn có thể thay đổi lộ trình bất cứ lúc nào trong cài đặt
        </p>
      </div>
    </div>
  );
}
