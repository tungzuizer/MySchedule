import type { Metadata } from "next";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "LEAD | Nền tảng phát triển cá nhân hoá",
  description: "Lộ trình học tập cá nhân hoá bởi AI. Phát triển kỹ năng cùng coach chuyên gia và AI Coach.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-background text-foreground font-sans antialiased relative">
        {/* Dark mode toggle */}
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
