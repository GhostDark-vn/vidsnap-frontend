"use client";

const STEPS = [
  { n: "1", icon: "📋", title: "Sao chép link", desc: 'Mở TikTok, nhấn "Chia sẻ" → "Sao chép liên kết" trên bất kỳ video nào.' },
  { n: "2", icon: "⚡", title: "Dán & nhấn tải", desc: 'Dán link vào ô bên trên và nhấn "Tải xuống". Hệ thống xử lý trong vài giây.' },
  { n: "3", icon: "🎯", title: "Chọn định dạng", desc: "Chọn Video HD, 4K hoặc MP3. File tải thẳng về thiết bị, không cần đăng nhập." },
];

export default function StepsSection() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-2 text-center text-2xl font-extrabold">Cách sử dụng</h2>
        <p className="mb-10 text-center text-sm" style={{ color: "#8888aa" }}>
          Chỉ 3 bước đơn giản để tải video về máy
        </p>
        <div className="grid gap-5 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="card rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1"
              style={{ borderColor: "var(--color-border)" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#fe2c55")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
            >
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-extrabold"
                  style={{ background: "linear-gradient(135deg,#fe2c55,#c2185b)" }}
                >
                  {s.n}
                </div>
                <span className="text-2xl">{s.icon}</span>
              </div>
              <h3 className="mb-2 text-[15px] font-bold">{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#8888aa" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
