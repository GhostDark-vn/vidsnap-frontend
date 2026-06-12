"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 border-b px-6"
      style={{
        borderColor: "var(--color-border)",
        background: "rgba(10,10,15,0.85)",
        backdropFilter: "blur(14px)",
      }}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div
            className="flex items-center justify-center rounded-xl p-1.5"
            style={{ background: "linear-gradient(135deg,#fe2c55,#c2185b)" }}
          >
            <TikTokIcon size={16} />
          </div>
          <span className="text-lg font-extrabold tracking-tight">VidSnap</span>
        </div>

        {/* Nav links — hidden on mobile */}
        <div className="hidden gap-7 md:flex">
          {["Tải Video", "Tải Ảnh", "Tải MP3", "Hướng dẫn"].map((t) => (
            <span
              key={t}
              className="cursor-pointer text-sm font-medium text-[#8888aa] transition-colors hover:text-white"
            >
              {t}
            </span>
          ))}
        </div>

        <button
          className="btn-primary !py-2 !px-4 !text-xs !rounded-lg"
          style={{ background: "linear-gradient(135deg,#fe2c55,#c2185b)" }}
        >
          Chrome Extension
        </button>
      </div>
    </nav>
  );
}

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.74a4.85 4.85 0 01-1.01-.05z" />
    </svg>
  );
}
