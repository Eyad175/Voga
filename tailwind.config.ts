import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        foreground: "#ffffff",
        voga: {
          red: "#FF1E1E",
          orange: "#FF4F00",
          yellow: "#FFB800",
          dark: "#050505",
          card: "#0A0A0A",
        },
      },
      fontFamily: {
        display: ["var(--font-exo)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 30, 30, 0.5)" },
          "50%": { boxShadow: "0 0 40px rgba(255, 79, 0, 0.8)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
