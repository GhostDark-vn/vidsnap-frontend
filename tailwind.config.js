/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red:  "#fe2c55",
          cyan: "#25f4ee",
          dark: "#0a0a0f",
          surface: "#13131a",
          card:   "#1a1a24",
          border: "#2a2a38",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "gradient-shift": "gradientShift 6s ease infinite",
        "spin-slow": "spin 2s linear infinite",
        "fade-in-up": "fadeInUp 0.35s ease forwards",
        shimmer: "shimmer 1.4s infinite",
      },
      keyframes: {
        gradientShift: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%":      { backgroundPosition: "100% 50%" },
        },
        fadeInUp: {
          from: { opacity: 0, transform: "translateY(16px)" },
          to:   { opacity: 1, transform: "translateY(0)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition:  "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
