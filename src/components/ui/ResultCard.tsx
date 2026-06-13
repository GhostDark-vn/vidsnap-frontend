"use client";
import { useState } from "react";
import Image from "next/image";
import type { VideoInfo, DownloadOption } from "@/types";
import { buildProxyUrl, formatDuration, formatCount } from "@/lib/api";

interface Props {
  data: VideoInfo;
  onReset: () => void;
}

export default function ResultCard({ data, onReset }: Props) {
  const [downloading, setDownloading] = useState<number | null>(null);
  const [progress, setProgress]       = useState(0);

  async function handleDownload(item: DownloadOption, idx: number) {
  setDownloading(idx);
  setProgress(0);

  const API_URL = "https://vidsnap-backend-production-dacb.up.railway.app";
  const filename = `vidsnap_${data.id}.${item.ext}`;

  try {
    for (let p = 0; p <= 60; p += 20) {
      await new Promise((r) => setTimeout(r, 200));
      setProgress(p);
    }

    // Luôn dùng ytdlp-download — tải qua server, không trực tiếp CDN
    const params = new URLSearchParams({
      url: item.url,
      filename,
    });
    const downloadUrl = `${API_URL}/api/v1/ytdlp-download?${params}`;

    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setProgress(100);
  } finally {
    setTimeout(() => {
      setDownloading(null);
      setProgress(0);
    }, 1000);
  }
}

  const videoOptions  = data.downloads.filter((d) => d.media_type === "video");
  const audioOptions  = data.downloads.filter((d) => d.media_type === "audio");
  const imageOptions  = data.downloads.filter((d) => d.media_type === "image");

  return (
    <div
      className="card animate-fade-in-up mx-auto max-w-2xl"
      style={{ animation: "fadeInUp 0.35s ease forwards" }}
    >
      {/* ── Video info ───────────────────────────────────────────── */}
      <div
        className="flex gap-4 p-5 pb-4"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        {/* Thumbnail */}
        <div className="relative shrink-0 overflow-hidden rounded-xl" style={{ width: 88, height: 124 }}>
          {data.thumbnail ? (
            <img
              src={data.thumbnail}
              alt="thumbnail"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-3xl"
              style={{ background: "var(--color-surface)" }}>🎵</div>
          )}
          {data.duration && (
            <span
              className="absolute bottom-1.5 right-1.5 rounded px-1.5 py-0.5 text-[10px] font-bold"
              style={{ background: "rgba(0,0,0,0.8)" }}
            >
              {formatDuration(data.duration)}
            </span>
          )}
          {data.is_slideshow && (
            <span
              className="absolute top-1.5 left-1.5 rounded px-1.5 py-0.5 text-[10px] font-bold"
              style={{ background: "rgba(254,44,85,0.9)" }}
            >
              {data.images.length} ảnh
            </span>
          )}
        </div>

        {/* Meta */}
        <div className="min-w-0 flex-1">
          <p className="mb-1.5 line-clamp-2 text-sm font-bold leading-snug">
            {data.title}
          </p>
          <p className="mb-3 text-xs font-semibold" style={{ color: "#ff4d6d" }}>
            {data.author}
          </p>
          <div className="flex flex-wrap gap-3 text-xs" style={{ color: "#8888aa" }}>
            {data.view_count != null    && <span>👁 {formatCount(data.view_count)}</span>}
            {data.like_count != null    && <span>❤️ {formatCount(data.like_count)}</span>}
            {data.comment_count != null && <span>💬 {formatCount(data.comment_count)}</span>}
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase"
              style={{ background: "rgba(37,244,238,0.1)", color: "#25f4ee" }}
            >
              {data.source}
            </span>
          </div>
        </div>

        {/* Close */}
        <button
          onClick={onReset}
          className="shrink-0 self-start rounded-lg p-1.5 text-lg transition-colors"
          style={{ color: "#8888aa" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#fff")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#8888aa")}
        >
          ✕
        </button>
      </div>

      {/* ── Download options ─────────────────────────────────────── */}
      <div className="p-4">
        <p
          className="mb-3 text-[11px] font-semibold uppercase tracking-widest"
          style={{ color: "#555570" }}
        >
          Chọn định dạng tải xuống
        </p>

        {/* Video options */}
        {videoOptions.length > 0 && (
          <OptionGroup label="🎬 Video" options={videoOptions} baseIdx={0}
            downloading={downloading} progress={progress} onDownload={handleDownload} />
        )}

        {/* Audio options */}
        {audioOptions.length > 0 && (
          <OptionGroup label="🎵 Âm thanh" options={audioOptions}
            baseIdx={videoOptions.length}
            downloading={downloading} progress={progress} onDownload={handleDownload} isMp3 />
        )}

        {/* Image slideshow */}
        {data.is_slideshow && data.images.length > 0 && (
          <div className="mt-3">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "#555570" }}>
              🖼️ Ảnh slideshow ({data.images.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {data.images.map((img) => (
                <a
                  key={img.index}
                  href={img.url}
                  download={`slide_${img.index}.jpg`}
                  className="btn-download !py-1.5 !px-3 !text-xs"
                  style={{ background: "linear-gradient(135deg,#0f766e,#0e7490)" }}
                >
                  Ảnh {img.index}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function OptionGroup({
  label, options, baseIdx, downloading, progress, onDownload, isMp3 = false,
}: {
  label: string;
  options: DownloadOption[];
  baseIdx: number;
  downloading: number | null;
  progress: number;
  onDownload: (item: DownloadOption, idx: number) => void;
  isMp3?: boolean;
}) {
  return (
    <div className="mb-3">
      <p className="mb-1.5 text-[11px] font-medium" style={{ color: "#8888aa" }}>{label}</p>
      <div className="flex flex-col gap-2">
        {options.map((item, i) => {
          const idx = baseIdx + i;
          const isDownloading = downloading === idx;
          return (
            <div
              key={idx}
              className="flex items-center justify-between rounded-xl border px-4 py-3 transition-colors"
              style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#fe2c55")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
            >
              <div>
                <p className="text-sm font-semibold">{item.label}</p>
                <p className="text-xs" style={{ color: "#8888aa" }}>
                  {item.quality}{item.size_approx ? ` · ${item.size_approx}` : ""}
                </p>
              </div>

              {isDownloading ? (
                <div className="w-28">
                  <div className="mb-1 h-1 overflow-hidden rounded-full" style={{ background: "var(--color-border)" }}>
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${progress}%`,
                        background: "linear-gradient(90deg,#fe2c55,#25f4ee)",
                      }}
                    />
                  </div>
                  <p className="text-right text-[10px]" style={{ color: "#8888aa" }}>{progress}%</p>
                </div>
              ) : (
                <button
                  className={`btn-download ${isMp3 ? "mp3" : ""}`}
                  onClick={() => onDownload(item, idx)}
                >
                  <DownloadIcon />
                  {isMp3 ? "MP3" : "Tải xuống"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
