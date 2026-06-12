"use client";
import { useEffect } from "react";

interface Props {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
}

const colors = {
  success: "#25f4ee",
  error:   "#ef4444",
  info:    "#fe2c55",
};

export default function Toast({ message, type, onClose }: Props) {
  useEffect(() => {
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 max-w-xs rounded-xl border p-4 shadow-2xl"
      style={{
        background: "var(--color-card)",
        borderColor: colors[type],
        animation: "fadeInUp 0.3s ease",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm leading-relaxed">{message}</p>
        <button
          onClick={onClose}
          className="shrink-0 text-base transition-colors"
          style={{ color: "#8888aa" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#fff")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#8888aa")}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
