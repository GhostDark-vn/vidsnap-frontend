"use client";
import { useRef } from "react";

interface Props {
  url: string;
  setUrl: (v: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

export default function HeroSection({ url, setUrl, onSubmit, loading }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      inputRef.current?.focus();
    } catch {
      inputRef.current?.focus();
    }
  }

  return (
    <section
      className="px-6 pb-14 pt-20"
      style={{
        background:
          "linear-gradient(135deg,rgba(254,44,85,0.1),rgba(37,244,238,0.05),rgba(254,44,85,0.08))",
        backgroundSize: "400% 400%",
        animation: "gradientShift 8s ease infinite",
      }}
    >
      <div className="mx-auto max-w-2xl text-center">
        {/* Badge */}
        <div
          className="mb-5 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold"
          style={{
            borderColor: "rgba(254,44,85,0.35)",
            background: "rgba(254,44,85,0.1)",
            color: "#ff4d6d",
          }}
        >
          ✨ Miễn phí · Không watermark · HD/4K
        </div>

        {/* Headline */}
        <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          Tải Video TikTok{" "}
          <span
            style={{
              background: "linear-gradient(135deg,#fe2c55,#25f4ee)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Không Logo
          </span>
        </h1>

        <p className="mb-10 text-[15px] leading-relaxed text-[#8888aa]">
          Dán link TikTok hoặc Douyin, nhận ngay video sạch watermark.
          <br />
          Hỗ trợ HD · 4K · MP3 · Ảnh slideshow. Không cần đăng nhập.
        </p>

        {/* Input row */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="input-ring flex-1">
            <input
              ref={inputRef}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSubmit()}
              placeholder="Dán link TikTok hoặc Douyin vào đây..."
            />
          </div>
          <button
            className="btn-primary min-w-[130px] shrink-0"
            onClick={onSubmit}
            disabled={loading || !url.trim()}
          >
            {loading ? (
              <>
                <SpinIcon /> Đang xử lý
              </>
            ) : (
              <>
                <DownloadIcon /> Tải xuống
              </>
            )}
          </button>
        </div>

        {/* Sub-actions */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handlePaste}
            className="rounded-lg border px-3.5 py-2 text-xs font-medium transition-all"
            style={{ borderColor: "var(--color-border)", color: "#8888aa" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#fff";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#fe2c55";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#8888aa";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-border)";
            }}
          >
            📋 Dán từ clipboard
          </button>
          <span className="text-xs text-[#555570]">
            Hỗ trợ tiktok.com · vm.tiktok · douyin.com
          </span>
        </div>
      </div>
    </section>
  );
}

function DownloadIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function SpinIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}>
      <path d="M21 12a9 9 0 11-6.219-8.56" strokeLinecap="round" />
    </svg>
  );
}
