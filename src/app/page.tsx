"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ResultCard from "@/components/ui/ResultCard";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import StepsSection from "@/components/sections/StepsSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import StatsSection from "@/components/sections/StatsSection";
import FAQSection from "@/components/sections/FAQSection";
import Toast from "@/components/ui/Toast";
import { fetchVideoInfo, ApiError } from "@/lib/api";
import type { VideoInfo } from "@/types";

export default function Home() {
  const [url, setUrl]       = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult]  = useState<VideoInfo | null>(null);
  const [toast, setToast]    = useState<{ msg: string; type: "success" | "error" | "info" } | null>(null);

  function showToast(msg: string, type: "success" | "error" | "info" = "info") {
    setToast({ msg, type });
  }

  async function handleSubmit() {
    const trimmed = url.trim();
    if (!trimmed) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetchVideoInfo(trimmed);
      if (res.data) {
        setResult(res.data);
        showToast("✅ Tìm thấy video! Chọn định dạng để tải.", "success");
      }
    } catch (e) {
      if (e instanceof ApiError) {
        showToast("❌ " + e.message, "error");
      } else {
        showToast("❌ Lỗi kết nối. Vui lòng thử lại.", "error");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setResult(null);
    setUrl("");
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      <Navbar />
      <HeroSection
        url={url}
        setUrl={setUrl}
        onSubmit={handleSubmit}
        loading={loading}
      />

      {/* Result zone */}
      <div className="px-6 pb-10">
        {loading && <LoadingSkeleton />}
        {!loading && result && (
          <ResultCard data={result} onReset={handleReset} />
        )}
      </div>

      <StepsSection />
      <StatsSection />
      <FeaturesSection />
      <FAQSection />
      <Footer />

      {toast && (
        <Toast
          message={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
