"use client";

import { useState } from "react";
import { MOCK_ORGANIZATIONS, MOCK_MENTORS_FOR_COMPETITION } from "@/lib/mock-data";

const FILTERS = ["Tất cả", "Quốc tế", "Toàn quốc", "Khu vực"];

const LEVEL_COLOR: Record<string, string> = {
  "Quốc tế": "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
  "Toàn quốc": "bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300",
  "Khu vực": "bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300",
};

export default function OrganizationsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Tất cả");
  const [activeTab, setActiveTab] = useState<"competitions" | "mentors">("competitions");

  const filtered = MOCK_ORGANIZATIONS.filter((comp) => {
    const matchSearch =
      search === "" ||
      comp.name.toLowerCase().includes(search.toLowerCase()) ||
      comp.description.toLowerCase().includes(search.toLowerCase());
    const matchLevel =
      filter === "Tất cả" || (comp as any).level === filter;
    return matchSearch && matchLevel;
  });

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 lg:pb-0">

      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20 uppercase tracking-wider">
          🏆 Cuộc thi & Mentor
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">Thi đấu & Phát triển Kỹ năng Mềm</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Tham gia các cuộc thi uy tín như <span className="font-semibold text-primary">FIRST Robotics</span>, rèn luyện kỹ năng mềm thực chiến và được hỗ trợ bởi đội ngũ mentor chuyên nghiệp.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
        {[
          { value: "3", label: "Cuộc thi hỗ trợ" },
          { value: "69+", label: "Mentor kinh nghiệm" },
          { value: "9,100+", label: "Thành viên tham gia" },
        ].map((s) => (
          <div key={s.label} className="text-center p-4 bg-card border border-border rounded-2xl">
            <p className="text-2xl font-extrabold text-primary">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5 font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        {[
          { key: "competitions", label: "🏅 Cuộc thi" },
          { key: "mentors", label: "🎓 Đội ngũ Mentor" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-5 py-2.5 text-sm font-semibold transition-all border-b-2 -mb-px ${activeTab === tab.key
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "competitions" && (
        <>
          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-3 items-center bg-card border border-border p-4 rounded-2xl shadow-sm">
            <div className="relative w-full sm:max-w-sm">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm kiếm cuộc thi..."
                className="w-full h-10 pl-9 pr-4 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto overflow-x-auto">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${filter === f
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "bg-background border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Competition Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((comp) => (
              <div
                key={comp.id}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 flex flex-col"
              >
                {/* Cover */}
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={comp.image}
                    alt={comp.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {/* Level badge */}
                  <div className={`absolute top-3 right-3 px-3 py-1 text-xs font-bold rounded-full shadow ${LEVEL_COLOR[(comp as any).level] || "bg-primary/80 text-white"}`}>
                    {(comp as any).level}
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-extrabold text-white drop-shadow">{comp.name}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                    {comp.description}
                  </p>

                  {/* Skill tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {comp.skills.map((skill) => (
                      <span key={skill} className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-bold rounded-lg">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                    <div className="flex flex-col bg-muted/50 rounded-xl p-3">
                      <span className="text-lg font-extrabold text-primary">{(comp as any).mentorCount}</span>
                      <span className="text-xs text-muted-foreground">Mentor hỗ trợ</span>
                    </div>
                    <div className="flex flex-col bg-muted/50 rounded-xl p-3">
                      <span className="text-lg font-extrabold text-primary">{comp.studentCount.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground">Học viên</span>
                    </div>
                  </div>

                  {/* Next event */}
                  <div className="flex items-center gap-2 mb-4 text-sm">
                    <span className="text-lg">📅</span>
                    <span className="text-muted-foreground">Mùa thi tiếp theo:</span>
                    <span className="font-semibold text-foreground">{(comp as any).nextEvent}</span>
                  </div>

                  {/* Actions */}
                  <div className="mt-auto pt-4 border-t border-border flex items-center justify-between gap-3">
                    <a
                      href={comp.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground hover:text-primary transition-colors font-medium underline-offset-2 hover:underline"
                    >
                      {comp.website.replace("https://", "")}
                    </a>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all">
                      Đăng ký Mentor
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === "mentors" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_MENTORS_FOR_COMPETITION.map((mentor) => (
            <div
              key={mentor.id}
              className="group bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-border group-hover:border-primary/40 transition-colors"
                />
                <div>
                  <h3 className="font-bold text-base">{mentor.name}</h3>
                  <p className="text-xs text-muted-foreground leading-snug mt-0.5">{mentor.title}</p>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {mentor.skills.map((skill) => (
                  <span key={skill} className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded-md">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-muted/50 rounded-xl p-3 text-center">
                  <p className="text-xl font-extrabold text-primary">{mentor.sessionsGiven}</p>
                  <p className="text-xs text-muted-foreground">Buổi mentor</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-3 text-center">
                  <p className="text-xl font-extrabold text-amber-500">⭐ {mentor.rating}</p>
                  <p className="text-xs text-muted-foreground">Đánh giá</p>
                </div>
              </div>

              {/* Competitions */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {mentor.competitions.map((cId) => {
                  const comp = MOCK_ORGANIZATIONS.find((c) => c.id === cId);
                  return comp ? (
                    <span key={cId} className={`px-2 py-0.5 bg-gradient-to-r ${comp.color} text-white text-xs font-bold rounded-full`}>
                      {comp.shortName}
                    </span>
                  ) : null;
                })}
              </div>

              <button className="mt-auto w-full py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all shadow-md shadow-primary/20 hover:scale-[1.02] active:scale-95">
                Đặt lịch Mentoring
              </button>
            </div>
          ))}
        </div>
      )}

      {/* CTA banner */}
      <div className="relative overflow-hidden p-8 bg-gradient-to-r from-primary/10 via-blue-500/5 to-violet-500/10 border border-primary/20 rounded-2xl text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
        </div>
        <p className="text-2xl font-extrabold mb-2 relative">Muốn trở thành Mentor? 🎓</p>
        <p className="text-muted-foreground text-sm mb-5 relative max-w-md mx-auto">
          Nếu bạn có kinh nghiệm thi đấu hoặc huấn luyện trong các cuộc thi kỹ năng, hãy đăng ký trở thành mentor để hỗ trợ thế hệ tiếp theo.
        </p>
        <button className="relative px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:scale-105 active:scale-95">
          Đăng ký làm Mentor
        </button>
      </div>
    </div>
  );
}
