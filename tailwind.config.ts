import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#fbf8f1",
        ink: "#11100e",
        graphite: "#4d4944",
        hairline: "#e1d7ca",
        oxblood: "#850019",
        "oxblood-dark": "#5e0011",
        sage: "#e7f2e6",
        "sage-ink": "#24713b",
        amber: "#fff1cf",
        "amber-ink": "#9a6800"
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ]
      },
      boxShadow: {
        panel: "0 18px 60px rgba(48, 35, 24, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
