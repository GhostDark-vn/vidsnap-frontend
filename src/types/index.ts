export type MediaType = "video" | "audio" | "image";

export interface DownloadOption {
  label: string;
  quality: string;
  size_approx: string | null;
  url: string;
  media_type: MediaType;
  ext: string;
  width?: number;
  height?: number;
  tbr?: number;
}

export interface ImageItem {
  index: number;
  url: string;
  width?: number;
  height?: number;
}

export interface VideoInfo {
  id: string;
  title: string;
  author: string;
  author_url?: string;
  thumbnail: string;
  duration?: number;
  view_count?: number;
  like_count?: number;
  comment_count?: number;
  source: "tiktok" | "douyin";
  downloads: DownloadOption[];
  images: ImageItem[];
  is_slideshow: boolean;
}

export interface DownloadResponse {
  success: boolean;
  cached: boolean;
  data?: VideoInfo;
  error?: string;
  error_code?: string;
}
