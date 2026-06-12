"use client";
import { useState } from "react";

const FAQS = [
  { q: "Có tải được video Douyin không?",   a: "Có, hỗ trợ đầy đủ video Douyin không logo. Lấy link từ app Douyin và dán vào là xong." },
  { q: "Có mất phí không?",                  a: "Không, miễn phí hoàn toàn. Dịch vụ được duy trì nhờ quảng cáo không xâm phạm." },
  { q: "Tải nhạc dạng MP3 được không?",      a: "Được. Dán link video rồi chọn định dạng MP3 để tách phần âm thanh chất lượng gốc." },
  { q: "Có lưu video của tôi không?",        a: "Không. Video stream trực tiếp từ máy chủ TikTok đến thiết bị. Không lưu trữ gì." },
  { q: "Tải được bao nhiêu video?",          a: "Không giới hạn số lần tải. Bạn có thể tải bao nhiêu video tùy thích." },
  { q: "Có app di động không?",              a: "Không. Dịch vụ chạy trên trình duyệt, hoạt động tốt trên Safari (iOS) và Chrome (Android)." },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="px-6 py-16" style={{ background: "var(--color-surface)" }}>
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-10 text-center text-2xl font-extrabold">Câu hỏi thường gặp</h2>
        {FAQS.map((f, i) => (
          <div
            key={i}
            style={{ borderBottom: "1px solid var(--color-border)" }}
          >
            <button
              className="flex w-full items-center justify-between gap-3 py-4 text-left text-[15px] font-semibold transition-colors hover:text-[#ff4d6d]"
              onClick={() => setOpen(open === i ? null : i)}
            >
              {f.q}
              <span
                className="shrink-0 text-lg transition-transform duration-200"
                style={{
                  color: "#fe2c55",
                  display: "inline-block",
                  transform: open === i ? "rotate(45deg)" : "none",
                }}
              >
                +
              </span>
            </button>
            {open === i && (
              <p className="pb-4 text-sm leading-relaxed" style={{ color: "#8888aa" }}>
                {f.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
