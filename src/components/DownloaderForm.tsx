"use client";
import { useState, useRef } from "react";
import { fetchVideoInfo, VideoInfo, ApiError } from "@/lib/api";

interface Props {
  onResult: (info: VideoInfo) => void;
  onLoading: (v: boolean) => void;
  onError: (msg: string) => void;
}

export default function DownloaderForm({ onResult, onLoading, onError }: Props) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit() {
    if (!url.trim() || loading) return;
    setLoading(true);
    onLoading(true);
    onError("");
    try {
      const info = await fetchVideoInfo(url.trim());
      onResult(info);
    } catch (e) {
      if (e instanceof ApiError) {
        onError(e.message);
      } else {
        onError("Không thể kết nối server. Vui lòng thử lại.");
      }
    } finally {
      setLoading(false);
      onLoading(false);
    }
  }

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
    <div className="w-full max-w-2xl mx-auto">
      {/* Gradient ring input */}
      <div className="p-[2px] rounded-2xl bg-gradient-to-r from-[#fe2c55] via-[#25f4ee] to-[#fe2c55] bg-[length:300%_300%] animate-gradient-shift">
        <div className="flex items-center bg-[#13131a] rounded-[14px] pr-2">
          <input
            ref={inputRef}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Dán link TikTok hoặc Douyin vào đây..."
            className="flex-1 bg-transparent px-5 py-4 text-sm text-white placeholder-[#555570] outline-none"
          />
          <button
            onClick={handleSubmit}
            disabled={loading || !url.trim()}
            className="flex items-center gap-2 bg-gradient-to-r from-[#fe2c55] to-[#c2185b] text-white font-bold text-sm px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 hover:-translate-y-px transition-all active:translate-y-0 whitespace-nowrap"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 11-6.219-8.56" strokeLinecap="round" />
                </svg>
                Đang xử lý
              </>
            ) : (
              <>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Tải xuống
              </>
            )}
          </button>
        </div>
      </div>

      {/* Sub-actions */}
      <div className="flex items-center gap-4 mt-3 justify-center">
        <button
          onClick={handlePaste}
          className="flex items-center gap-1.5 text-[#8888aa] text-xs border border-[#2a2a38] rounded-lg px-3 py-1.5 hover:text-white hover:border-[#fe2c55] transition-all"
        >
          📋 Dán từ clipboard
        </button>
        <span className="text-[#555570] text-xs">
          Hỗ trợ tiktok.com · vm.tiktok · douyin.com
        </span>
      </div>
    </div>
  );
}
