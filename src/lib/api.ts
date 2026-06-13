import type { DownloadResponse } from "@/types";

const API_URL = "https://vidsnap-backend-production-dacb.up.railway.app"; 

export class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public status: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function fetchVideoInfo(url: string): Promise<DownloadResponse> {
  const res = await fetch(`${API_URL}/api/v1/download`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
    signal: AbortSignal.timeout(30_000),
  });

  if (res.status === 429) {
    const data = await res.json().catch(() => ({}));
    throw new ApiError(
      "rate_limit",
      data.message || "Quá nhiều yêu cầu. Vui lòng thử lại sau.",
      429
    );
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const detail = data?.detail;
    throw new ApiError(
      detail?.code || "unknown_error",
      detail?.error || "Có lỗi xảy ra. Vui lòng thử lại.",
      res.status
    );
  }

  return res.json();
}

export function buildProxyUrl(directUrl: string, filename: string): string {
  const params = new URLSearchParams({ url: directUrl, filename });
  return `${API_URL}/api/v1/proxy?${params}`;
}

export function formatDuration(seconds?: number): string {
  if (!seconds) return "";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function formatCount(n?: number): string {
  if (!n) return "0";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}