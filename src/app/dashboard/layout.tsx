"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MOCK_USER, MOCK_NOTIFICATIONS } from "@/lib/mock-data";

const NAV_LINKS = [
  { href: "/dashboard", label: "Tổng quan", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { href: "/dashboard/skills", label: "Kỹ năng", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
  { href: "/dashboard/roadmap", label: "Lộ trình", icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" },
  { href: "/dashboard/journey", label: "Hành trình LEAD", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { href: "/dashboard/schedule", label: "Lịch trình", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { href: "/dashboard/coach", label: "AI Coach", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" },
  { href: "/dashboard/coaches", label: "Chuyên gia", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
  { href: "/dashboard/organizations", label: "Chương trình thi đấu", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">

      {/* ── Top Header ── */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <a href="/dashboard" className="flex items-center gap-3 font-extrabold text-2xl tracking-tight text-primary flex-shrink-0 group">
            <img src="/logo.png" alt="LEAD Logo" className="w-12 h-12 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
            <span className="hidden sm:block bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">LEAD</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive ? 2.5 : 1.5} d={link.icon} />
                  </svg>
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 flex-shrink-0">

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-muted transition-colors relative"
              >
                <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b border-border flex items-center justify-between">
                    <h3 className="font-bold text-sm">Thông báo</h3>
                    <span className="text-xs text-muted-foreground">{unreadCount} chưa đọc</span>
                  </div>
                  <div className="divide-y divide-border max-h-72 overflow-y-auto">
                    {MOCK_NOTIFICATIONS.map((n) => {
                      const icons: Record<string, string> = { reminder: "⏰", achievement: "🏆", coach: "👤" };
                      return (
                        <div key={n.id} className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer ${!n.read ? "bg-primary/5" : ""}`}>
                          <div className="flex items-start gap-3">
                            <span className="text-lg flex-shrink-0">{icons[n.type]}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold">{n.title}</p>
                              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{n.message}</p>
                            </div>
                            <span className="text-xs text-muted-foreground flex-shrink-0">{n.time}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="p-3 border-t border-border">
                    <button className="w-full text-xs text-primary font-semibold hover:underline">
                      Xem tất cả thông báo
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md cursor-pointer hover:scale-105 transition-transform">
              {MOCK_USER.name.split(" ").slice(-1)[0][0]}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center hover:bg-muted transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-card animate-in slide-in-from-top-2 duration-200">
            <nav className="container mx-auto px-4 py-3 grid grid-cols-2 gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
                      }`}
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={link.icon} />
                    </svg>
                    {link.label}
                  </a>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* ── Main ── */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      {/* ── Mobile Bottom Nav ── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border z-40 px-2 pb-safe">
        <div className="flex items-center justify-around py-2">
          {NAV_LINKS.slice(0, 5).map((link) => {
            const isActive = pathname === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${isActive ? "text-primary" : "text-muted-foreground"
                  }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive ? 2.5 : 1.5} d={link.icon} />
                </svg>
                <span className="text-[10px] font-medium">{link.label}</span>
              </a>
            );
          })}
        </div>
      </nav>

      {/* Overlay for notifications */}
      {notifOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
      )}
    </div>
  );
}
