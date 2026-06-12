"use client";

export default function LoadingSkeleton() {
  return (
    <div
      className="card mx-auto max-w-2xl p-6"
      style={{ animation: "fadeInUp 0.35s ease forwards" }}
    >
      <div className="mb-5 flex gap-4">
        <div className="shimmer-box h-28 w-20 shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="shimmer-box h-4 w-4/5 rounded-lg" />
          <div className="shimmer-box h-3 w-1/2 rounded-lg" />
          <div className="shimmer-box h-3 w-1/3 rounded-lg" />
        </div>
      </div>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="shimmer-box mb-2.5 h-14 rounded-xl" />
      ))}
    </div>
  );
}
