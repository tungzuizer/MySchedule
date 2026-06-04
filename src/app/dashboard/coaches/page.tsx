"use client";

import { useState } from "react";
import { MOCK_COACHES, MOCK_SKILLS } from "@/lib/mock-data";

const SPECIALIZATION_LABELS: Record<string, string> = {
  leadership: "Lãnh đạo",
  teamwork: "Làm việc nhóm",
  community: "Cộng đồng",
  "ai-tech": "AI & Công nghệ",
  entrepreneurship: "Khởi nghiệp",
  communication: "Giao tiếp",
  "product-management": "Quản lý Sản phẩm",
  "design-thinking": "Tư duy Thiết kế",
};

export default function CoachesPage() {
  const [selectedSpec, setSelectedSpec] = useState("all");
  const [selectedCoach, setSelectedCoach] = useState<string | null>(null);
  const [bookingCoach, setBookingCoach] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const allSpecs = ["all", ...Array.from(new Set(MOCK_COACHES.flatMap((c) => c.specializations)))];

  const filteredCoaches =
    selectedSpec === "all"
      ? MOCK_COACHES
      : MOCK_COACHES.filter((c) => c.specializations.includes(selectedSpec));

  const activeCoach = selectedCoach ? MOCK_COACHES.find((c) => c.id === selectedCoach) : null;

  const handleBook = () => {
    if (!selectedDay) return;
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingCoach(null);
      setBookingConfirmed(false);
      setSelectedDay("");
    }, 2500);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* ── Header ── */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 via-emerald-600 to-cyan-700 p-8 md:p-12 text-white shadow-2xl">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur text-xs font-semibold mb-4 border border-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            {MOCK_COACHES.length} chuyên gia đang hoạt động
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-3">
            Gặp gỡ Coach<br />của bạn
          </h1>
          <p className="text-white/75 text-lg">
            Mỗi coach là chuyên gia hàng đầu trong lĩnh vực, sẵn sàng đồng hành cùng bạn trong từng giai đoạn phát triển.
          </p>
        </div>
        <div className="absolute -top-12 -right-12 w-56 h-56 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-20 w-32 h-32 bg-cyan-400/20 rounded-full blur-2xl" />
      </section>

      {/* ── Filter ── */}
      <div className="flex gap-2 flex-wrap">
        {allSpecs.map((spec) => (
          <button
            key={spec}
            onClick={() => setSelectedSpec(spec)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedSpec === spec
              ? "bg-primary text-primary-foreground shadow-md shadow-primary/30 scale-105"
              : "bg-card border border-border text-muted-foreground hover:border-primary/50"
              }`}
          >
            {spec === "all" ? "Tất cả" : SPECIALIZATION_LABELS[spec] || spec}
          </button>
        ))}
      </div>

      {/* ── Coaches Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCoaches.map((coach) => {
          const linkedSkills = MOCK_SKILLS.filter((s) => coach.linkedSkills.includes(s.id));
          return (
            <div key={coach.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 group">
              {/* Top banner */}
              <div className="h-20 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent relative">
                <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-white text-xs font-bold ${coach.badgeColor}`}>
                  {coach.badge}
                </div>
              </div>

              <div className="px-6 pb-6 -mt-10">
                {/* Avatar */}
                <div className="relative mb-4">
                  <img
                    src={coach.avatar}
                    alt={coach.name}
                    className="w-20 h-20 rounded-2xl object-cover border-4 border-card shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-card" />
                </div>

                <h3 className="text-lg font-bold">{coach.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{coach.title}</p>

                {/* Rating & stats */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <span key={i} className={`text-sm ${i <= Math.round(coach.rating) ? "text-yellow-400" : "text-muted"}`}>★</span>
                    ))}
                    <span className="text-sm font-bold ml-1">{coach.rating}</span>
                    <span className="text-xs text-muted-foreground">({coach.reviewCount})</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-muted/50 rounded-xl p-3 text-center">
                    <p className="text-lg font-extrabold">{coach.sessionCount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Buổi tư vấn</p>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-3 text-center">
                    <p className="text-lg font-extrabold">{(coach.hourlyRate / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-muted-foreground">₫/giờ</p>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                  {coach.bio}
                </p>

                {/* Linked skills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {linkedSkills.map((s) => (
                    <span key={s.id} className={`text-xs px-2.5 py-1 rounded-full ${s.bgColor} ${s.textColor} font-medium`}>
                      {s.icon} {s.title.split(" ").slice(0, 2).join(" ")}
                    </span>
                  ))}
                </div>

                {/* Availability */}
                <div className="flex items-center gap-2 mb-5">
                  <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs text-muted-foreground">Lịch trống: </span>
                  <div className="flex gap-1 flex-wrap">
                    {coach.availability.map((day) => (
                      <span key={day} className="text-xs bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-md font-medium">
                        {day}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedCoach(selectedCoach === coach.id ? null : coach.id)}
                    className="flex-1 py-2.5 rounded-xl border border-border bg-background text-sm font-semibold hover:bg-muted transition-colors"
                  >
                    Xem profile
                  </button>
                  <button
                    onClick={() => { setBookingCoach(coach.id); setSelectedDay(""); setBookingConfirmed(false); }}
                    className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 shadow-md shadow-primary/30 transition-all hover:scale-105 active:scale-95"
                  >
                    Đặt lịch
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Booking Modal ── */}
      {bookingCoach && (() => {
        const coach = MOCK_COACHES.find(c => c.id === bookingCoach)!;
        return (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
              {bookingConfirmed ? (
                <div className="text-center py-6">
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="text-xl font-bold mb-2">Đặt lịch thành công!</h3>
                  <p className="text-muted-foreground">
                    Buổi tư vấn với <strong>{coach.name}</strong> đã được xác nhận.<br />
                    Bạn sẽ nhận được email xác nhận sớm.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold">Đặt lịch tư vấn</h3>
                    <button onClick={() => setBookingCoach(null)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center gap-3 mb-6 p-4 bg-muted/50 rounded-xl">
                    <img src={coach.avatar} alt={coach.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <p className="font-bold">{coach.name}</p>
                      <p className="text-sm text-muted-foreground">{coach.title}</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Chọn ngày</label>
                      <div className="grid grid-cols-3 gap-2">
                        {coach.availability.map((day) => (
                          <button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            className={`py-2.5 rounded-xl text-sm font-medium border transition-all ${selectedDay === day
                              ? "bg-primary text-primary-foreground border-primary shadow-md"
                              : "border-border hover:border-primary/50"
                              }`}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Giờ (mặc định 60 phút)</label>
                      <select className="w-full py-2.5 px-3 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40">
                        <option>09:00 – 10:00</option>
                        <option>14:00 – 15:00</option>
                        <option>17:00 – 18:00</option>
                        <option>19:00 – 20:00</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl text-sm">
                      <span className="text-muted-foreground">Chi phí</span>
                      <span className="font-bold text-lg">{(coach.hourlyRate).toLocaleString("vi-VN")} ₫</span>
                    </div>
                  </div>

                  <button
                    onClick={handleBook}
                    disabled={!selectedDay}
                    className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Xác nhận đặt lịch
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
