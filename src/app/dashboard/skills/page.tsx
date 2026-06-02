"use client";

import { useState, useMemo } from "react";
import { MOCK_SKILLS, SKILL_CATEGORIES, MOCK_COACHES, MOCK_ORGANIZATIONS, MOCK_USER } from "@/lib/mock-data";

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [enrolledSkills, setEnrolledSkills] = useState<string[]>(MOCK_USER.skills);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills = useMemo(() => {
    return MOCK_SKILLS.filter((skill) => {
      const matchCategory = activeCategory === "all" || skill.category === activeCategory;
      const matchSearch =
        searchQuery === "" ||
        skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleEnroll = (skillId: string) => {
    setEnrolledSkills((prev) =>
      prev.includes(skillId) ? prev.filter((s) => s !== skillId) : [...prev, skillId]
    );
  };

  const getCoachForSkill = (coachId: string) =>
    MOCK_COACHES.find((c) => c.id === coachId);

  const getOrgForSkill = (orgIds: string[]) =>
    MOCK_ORGANIZATIONS.filter((o) => orgIds.includes(o.id));

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* ── Header ── */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-8 md:p-12 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur text-xs font-semibold mb-4 border border-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {enrolledSkills.length} kỹ năng đang học
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-3">
            Chọn kỹ năng<br />bạn muốn phát triển
          </h1>
          <p className="text-white/75 text-lg leading-relaxed">
            Mỗi kỹ năng đi kèm lộ trình cá nhân hoá, coach chuyên gia và các tổ chức đối tác uy tín.
          </p>
        </div>
        {/* Decorative blobs */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-8 right-32 w-40 h-40 bg-indigo-400/20 rounded-full blur-2xl" />
      </section>

      {/* ── Search & Filter ── */}
      <section className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Tìm kiếm kỹ năng..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
          />
        </div>
        {/* Category pills */}
        <div className="flex gap-2 flex-wrap">
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/30 scale-105"
                  : "bg-card border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── Skills Grid ── */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            Hiển thị <span className="font-semibold text-foreground">{filteredSkills.length}</span> kỹ năng
          </p>
          {enrolledSkills.length > 0 && (
            <a href="/dashboard" className="text-sm text-primary hover:underline font-medium flex items-center gap-1">
              Xem lộ trình của bạn
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => {
            const isEnrolled = enrolledSkills.includes(skill.id);
            const coach = getCoachForSkill(skill.coachId);
            const orgs = getOrgForSkill(skill.organizationIds);
            const isHovered = hoveredSkill === skill.id;

            return (
              <div
                key={skill.id}
                onMouseEnter={() => setHoveredSkill(skill.id)}
                onMouseLeave={() => setHoveredSkill(null)}
                className={`group relative bg-card border rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer
                  ${isEnrolled ? `${skill.borderColor} shadow-lg` : "border-border hover:border-primary/30 hover:shadow-lg"}
                  ${isHovered ? "scale-[1.02] -translate-y-1" : ""}
                `}
              >
                {/* Card Top Gradient Bar */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${skill.color}`} />

                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${skill.bgColor} flex items-center justify-center text-2xl shadow-sm`}>
                      {skill.icon}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {isEnrolled && (
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${skill.bgColor} ${skill.textColor}`}>
                          ✓ Đang học
                        </span>
                      )}
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500 text-xs">★</span>
                        <span className="text-xs font-semibold">{skill.rating}</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold mb-1.5">{skill.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                    {skill.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {skill.tags.map((tag) => (
                      <span key={tag} className={`text-xs px-2.5 py-1 rounded-full ${skill.bgColor} ${skill.textColor} font-medium`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-2 mb-5 p-3 bg-muted/50 rounded-xl">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Thời gian</p>
                      <p className="text-sm font-bold mt-0.5">{skill.duration}</p>
                    </div>
                    <div className="text-center border-x border-border">
                      <p className="text-xs text-muted-foreground">Giai đoạn</p>
                      <p className="text-sm font-bold mt-0.5">{skill.phases} phase</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Học viên</p>
                      <p className="text-sm font-bold mt-0.5">{skill.enrolledCount.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Coach & Orgs */}
                  {coach && (
                    <div className="flex items-center gap-2 mb-4 p-2.5 bg-background rounded-xl border border-border">
                      <img
                        src={coach.avatar}
                        alt={coach.name}
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-background"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold truncate">{coach.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{coach.title.split(" ").slice(0, 3).join(" ")}...</p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <span className="text-yellow-400 text-xs">★</span>
                        <span className="text-xs font-bold">{coach.rating}</span>
                      </div>
                    </div>
                  )}

                  {/* Org badges */}
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-xs text-muted-foreground">Đối tác:</span>
                    {orgs.map((org) => (
                      <span key={org.id} className="text-xs font-semibold px-2 py-0.5 bg-muted rounded-md">
                        {org.shortName}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => toggleEnroll(skill.id)}
                    className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-95 ${
                      isEnrolled
                        ? "bg-muted text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        : `bg-gradient-to-r ${skill.color} text-white shadow-md hover:opacity-90 hover:shadow-lg`
                    }`}
                  >
                    {isEnrolled ? "Huỷ đăng ký" : "Đăng ký học ngay"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <div className="text-4xl mb-4">🔍</div>
            <p className="font-medium">Không tìm thấy kỹ năng phù hợp</p>
            <p className="text-sm mt-1">Thử thay đổi từ khoá hoặc danh mục</p>
          </div>
        )}
      </section>

      {/* ── Partner Organizations ── */}
      <section className="bg-card border border-border rounded-2xl p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold">Tổ chức đối tác</h2>
            <p className="text-sm text-muted-foreground mt-1">Hợp tác với các tổ chức giáo dục uy tín hàng đầu</p>
          </div>
          <a href="/dashboard/organizations" className="text-sm text-primary hover:underline font-medium">
            Xem tất cả →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOCK_ORGANIZATIONS.map((org) => (
            <div key={org.id} className="group flex items-center gap-4 p-4 rounded-xl border border-border bg-background hover:border-primary/40 hover:shadow-md transition-all cursor-pointer">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${org.color} flex items-center justify-center text-white font-black text-sm flex-shrink-0 shadow`}>
                {org.shortName.slice(0, 3)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm truncate">{org.name}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{org.courseCount} khóa học · {org.studentCount.toLocaleString()} học viên</p>
              </div>
              <svg className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
