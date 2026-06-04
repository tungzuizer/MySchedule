export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">

      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-500/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5 border-b border-border/50 backdrop-blur-sm bg-background/60">
        <div className="flex items-center gap-2.5">
          <img src="/logo.png" alt="LEAD Logo" className="w-14 h-14 object-contain drop-shadow-lg hover:scale-110 transition-transform duration-300" />
          <span className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">LEAD</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="/auth/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
            Đăng nhập
          </a>
          <a href="/auth/signup" className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-md shadow-primary/20 hover:scale-105 active:scale-95">
            Bắt đầu miễn phí
          </a>
        </div>
      </nav>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
            </span>
            Được hỗ trợ bởi Gemini AI
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-balance leading-[1.1]">
            Phát triển bản thân{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-violet-500 to-blue-600">
              đúng hướng
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Lộ trình cá nhân hoá bởi AI, coach chuyên gia đồng hành, và cộng đồng học tập từ các tổ chức hàng đầu Việt Nam.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <a
              href="/onboarding"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-blue-600 text-white font-bold rounded-xl shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              ✨ Tạo lộ trình của tôi
            </a>
            <a
              href="/dashboard/skills"
              className="w-full sm:w-auto px-8 py-4 bg-card border border-border text-foreground font-bold rounded-xl hover:bg-muted hover:border-primary/30 transition-all flex items-center justify-center gap-2"
            >
              🎯 Khám phá kỹ năng
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 pt-8 text-center">
            {[
              { value: "8+", label: "Kỹ năng chuyên sâu" },
              { value: "5", label: "Coach chuyên gia" },
              { value: "10,000+", label: "Học viên" },
              { value: "98%", label: "Hài lòng" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-extrabold text-primary">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Feature cards */}
        <div className="relative z-10 max-w-4xl mx-auto w-full mt-24 grid grid-cols-1 md:grid-cols-3 gap-5 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          {[
            {
              icon: "🤖",
              title: "AI Coach Cá Nhân",
              desc: "Lumina AI đồng hành 24/7, điều chỉnh lịch học và trả lời mọi câu hỏi theo ngữ cảnh của bạn.",
            },
            {
              icon: "🗺️",
              title: "Lộ Trình Cá Nhân Hoá",
              desc: "AI tạo lộ trình theo mục tiêu, trình độ và thời gian rảnh — không có hai lộ trình nào giống nhau.",
            },
            {
              icon: "🏆",
              title: "Coach Chuyên Gia",
              desc: "Kết nối với chuyên gia từ LUK, MakerViet, MCI để review tiến độ và mở giai đoạn tiếp theo.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="p-6 bg-card/60 backdrop-blur-sm border border-border rounded-2xl hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all group"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform inline-block">{f.icon}</div>
              <h3 className="font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Partner logos */}
        <div className="mt-20 text-center animate-in fade-in duration-700 delay-500">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">Đối tác đào tạo</p>
          <div className="flex flex-wrap justify-center gap-6 items-center">
            {["LUK Vietnam", "MakerViet", "MCI Institute"].map((org) => (
              <div key={org} className="px-5 py-2.5 bg-card border border-border rounded-xl text-sm font-bold text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all">
                {org}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-6 text-center text-xs text-muted-foreground">
        © 2026 LEAD · Được xây dựng với ❤️ cho cộng đồng học tập Việt Nam
      </footer>
    </div>
  );
}
