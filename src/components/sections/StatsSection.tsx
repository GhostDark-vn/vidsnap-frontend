"use client";

const STATS = [
  { value: "50M+",  label: "Video đã tải" },
  { value: "2M+",   label: "Người dùng/tháng" },
  { value: "40+",   label: "Ngôn ngữ" },
  { value: "99.9%", label: "Uptime" },
];

export default function StatsSection() {
  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <div
                className="text-3xl font-extrabold"
                style={{
                  background: "linear-gradient(135deg,#fe2c55,#25f4ee)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {s.value}
              </div>
              <div className="mt-1 text-sm" style={{ color: "#8888aa" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
