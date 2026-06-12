import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "VidSnap — Tải Video TikTok Không Logo",
  description:
    "Tải video TikTok không logo, watermark. Hỗ trợ HD, 4K, MP3, ảnh slideshow, Douyin. Miễn phí, không cần đăng ký.",
  keywords: ["tải video tiktok", "tiktok downloader", "không watermark", "vidsnap"],
  themeColor: "#fe2c55",
  openGraph: {
    title: "VidSnap — Tải Video TikTok Không Logo",
    description: "Tải video TikTok HD/4K không watermark. Miễn phí.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
