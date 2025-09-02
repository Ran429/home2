import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "0",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        container: "1400px",
      },
      listStyleType: {
        square: "square",
      },
      backgroundImage: {
        "gradient-1/2": "linear-gradient(180deg, var(--tw-gradient-stops))",
      },
      colors: {
        hvri_primary: "#233A38",   // 딥 그린/네이비 톤 (로고 기본)
        hvri_secondary: "#4F6462", // 중간 회색-녹색 톤
        hvri_accent: "#5C4433",    // 브라운 포인트 컬러

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "unfold-down": {
          from: { height: "0" },
          to: { height: "200px" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.5s ease-out",
        "accordion-up": "accordion-up 0.5s ease-out",
        "unfold-down": "unfold-down 0.5s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("daisyui")],
  safelist: [
    "transition-colors",

    // Primary
    "hover:text-hvri_primary",
    "active:text-hvri_primary",
    "active:bg-hvri_primary",
    "hover:bg-hvri_primary",

    // Secondary
    "hover:text-hvri_secondary",
    "active:text-hvri_secondary",
    "active:bg-hvri_secondary",
    "hover:bg-hvri_secondary",

    // Accent
    "hover:text-hvri_accent",
    "active:text-hvri_accent",
    "active:bg-hvri_accent",
    "hover:bg-hvri_accent",

    // Typography
    "hover:font-bold",
    "active:font-bold",
  ],

  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#233A38", // hvri_primary
        },
      },
    ],
    base: true,
    styled: true,
    utils: true,
    prefix: "daisy-",
    logs: true,
  },
} satisfies Config;

export default config;
