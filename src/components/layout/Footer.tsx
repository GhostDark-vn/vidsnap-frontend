"use client";

export default function Footer() {
  const socials = ["Facebook", "Instagram", "TikTok", "YouTube", "Twitter"];
  const legal   = ["Điều khoản", "Bảo mật", "DMCA", "Liên hệ"];

  return (
    <footer
      className="border-t px-6 py-10"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-5">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div
              className="flex rounded-xl p-1.5"
              style={{ background: "linear-gradient(135deg,#fe2c55,#c2185b)" }}
            >
              <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.74a4.85 4.85 0 01-1.01-.05z" />
              </svg>
            </div>
            <span className="text-base font-extrabold">VidSnap</span>
          </div>

          {/* Legal links */}
          <div className="flex flex-wrap gap-5">
            {legal.map((t) => (
              <span
                key={t}
                className="cursor-pointer text-sm text-[#8888aa] transition-colors hover:text-white"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-[#555570]">
            © 2026 VidSnap. Không liên kết với ByteDance hoặc TikTok.
          </p>
          <div className="flex gap-4">
            {socials.map((s) => (
              <span
                key={s}
                className="cursor-pointer text-xs text-[#555570] transition-colors hover:text-[#8888aa]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
