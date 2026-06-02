"use client";

import { useState } from "react";
import { MOCK_ORGANIZATIONS } from "@/lib/mock-data";

const FILTERS = ["Tất cả", "Kỹ thuật", "Lãnh đạo", "Cộng đồng", "Kinh doanh"];

export default function OrganizationsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Tất cả");

  const filtered = MOCK_ORGANIZATIONS.filter((org) => {
    const matchSearch =
      search === "" ||
      org.name.toLowerCase().includes(search.toLowerCase()) ||
      org.description.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 lg:pb-0">

      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20 uppercase tracking-wider">
          🤝 Đối tác đào tạo
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">Tổ chức & Đối tác</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Học tập cùng các tổ chức hàng đầu Việt Nam. Lộ trình được chứng nhận bởi chuyên gia thực chiến.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
        {[
          { value: "3", label: "Đối tác chiến lược" },
          { value: "38+", label: "Chương trình học" },
          { value: "17,100+", label: "Học viên" },
        ].map((s) => (
          <div key={s.label} className="text-center p-4 bg-card border border-border rounded-2xl">
            <p className="text-2xl font-extrabold text-primary">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5 font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search & filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-center bg-card border border-border p-4 rounded-2xl shadow-sm">
        <div className="relative w-full sm:max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm tổ chức..."
            className="w-full h-10 pl-9 pr-4 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                filter === f
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-background border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Org cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((org) => (
          <div
            key={org.id}
            className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 flex flex-col"
          >
            {/* Cover image */}
            <div className="h-44 overflow-hidden relative">
              <img
                src={org.image}
                alt={org.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              {/* Gradient badge */}
              <div className={`absolute top-3 right-3 px-3 py-1 bg-gradient-to-r ${org.color} text-white text-xs font-bold rounded-full shadow`}>
                Đối tác {org.partnerSince}
              </div>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-xl font-extrabold text-white drop-shadow">{org.name}</h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                {org.description}
              </p>

              {/* Skill tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {org.skills.map((skill) => (
                  <span key={skill} className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-bold rounded-lg">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex gap-4 text-sm mb-5">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="font-semibold text-foreground">{org.courseCount}</span> khoá học
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-semibold text-foreground">{org.studentCount.toLocaleString()}</span> học viên
                </div>
              </div>

              {/* Actions */}
              <div className="mt-auto pt-4 border-t border-border flex items-center justify-between gap-3">
                <a
                  href={org.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-primary transition-colors font-medium underline-offset-2 hover:underline"
                >
                  {org.website.replace("https://", "")}
                </a>
                <button className="flex items-center gap-1.5 text-sm font-bold text-primary group-hover:translate-x-1 transition-transform">
                  Xem chương trình
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA banner */}
      <div className="relative overflow-hidden p-8 bg-gradient-to-r from-primary/10 via-blue-500/5 to-violet-500/10 border border-primary/20 rounded-2xl text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
        </div>
        <p className="text-2xl font-extrabold mb-2 relative">Muốn trở thành đối tác? 🤝</p>
        <p className="text-muted-foreground text-sm mb-5 relative max-w-md mx-auto">
          Nếu tổ chức của bạn muốn kết nối và cung cấp chương trình học trên MySchedule, hãy liên hệ với chúng tôi.
        </p>
        <button className="relative px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:scale-105 active:scale-95">
          Liên hệ hợp tác
        </button>
      </div>
    </div>
  );
}
