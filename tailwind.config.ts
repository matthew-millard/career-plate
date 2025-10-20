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
        background: {
          DEFAULT: "var(--background)",
          backdrop: "var(--background-backdrop)",
        },

        foreground: {
          DEFAULT: "var(--foreground)",
          muted: {
            DEFAULT: "var(--foreground-muted)",
            extra: "var(--foreground-muted-extra)",
          },
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
          hover: "var(--primary-hover)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        card: "var(--card)",
        placeholder: "var(--placeholder)",
        subtle: "var(--subtle)",
      },
      borderColor: {
        DEFAULT: "var(--border)",
      },
      divideColor: {
        DEFAULT: "var(--divide)",
      },
    },
  },
  plugins: [],
} satisfies Config;
