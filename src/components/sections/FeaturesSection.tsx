"use client";

const FEATURES = [
  { icon: "✨", title: "Không watermark",   desc: "Xóa hoàn toàn logo TikTok. Nhận file MP4 sạch, chất lượng gốc." },
  { icon: "🎬", title: "HD & 4K",           desc: "Hỗ trợ độ phân giải đến 4K 2160p. Không nén, không mất chất lượng." },
  { icon: "🎵", title: "Tách nhạc MP3",     desc: "Lấy âm thanh từ bất kỳ video TikTok nào, định dạng MP3 320kbps." },
  { icon: "🖼️", title: "Tải ảnh slideshow", desc: "Tải từng ảnh trong bài slideshow, giữ nguyên độ phân giải gốc." },
  { icon: "🔒", title: "Bảo mật",           desc: "Không lưu video trên máy chủ. Không cần tài khoản TikTok." },
  { icon: "📱", title: "Đa thiết bị",       desc: "Hoạt động trên iPhone, Android, PC/Mac. Không cần cài app." },
  { icon: "⚡", title: "Siêu nhanh",        desc: "Xử lý trong 2–5 giây. Máy chủ tốc độ cao, không giới hạn lượt tải." },
  { icon: "🌏", title: "Hỗ trợ Douyin",     desc: "Tải video Douyin (TikTok bản Trung Quốc). Dán link là xong." },
];

export default function FeaturesSection() {
  return (
    <section className="px-6 py-16" style={{ background: "var(--color-surface)" }}>
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-2 text-center text-2xl font-extrabold">Tính năng nổi bật</h2>
        <p className="mb-10 text-center text-sm" style={{ color: "#8888aa" }}>
          Mọi thứ bạn cần để lưu nội dung TikTok
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="card rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1"
              style={{ background: "var(--color-bg)", borderColor: "var(--color-border)" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#fe2c55")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
            >
              <span className="mb-3 block text-2xl">{f.icon}</span>
              <h3 className="mb-1.5 text-sm font-bold">{f.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "#8888aa" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
