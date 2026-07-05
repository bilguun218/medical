import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        primary: {
          DEFAULT: "#0B2F55",
          foreground: "#FFFFFF"
        },
        medical: {
          DEFAULT: "#1769D1",
          foreground: "#FFFFFF"
        },
        teal: {
          DEFAULT: "#14B8A6",
          foreground: "#042F2E"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 20px 70px rgba(13, 59, 102, 0.10)",
        premium: "0 22px 60px rgba(11, 47, 85, 0.11)",
        subtle: "0 10px 30px rgba(11, 47, 85, 0.07)"
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem"
      }
    }
  },
  plugins: []
};

export default config;
