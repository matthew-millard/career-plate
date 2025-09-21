import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1536px",
      },
    },
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      colors: {
        background: "var(--background)",
        foreground: {
          DEFAULT: "var(--foreground)",
          muted: {
            DEFAULT: "var(--foreground-muted)",
            extra: "var(--foreground-muted-extra",
          },
        },
        primary: {
          DEFAULT: "var(--primary)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
        },
        card: {
          DEFAULT: "var(--card)",
        },
      },
      borderColor: {
        DEFAULT: "var(--border)",
      },
    },
  },
  plugins: [],
} satisfies Config;
