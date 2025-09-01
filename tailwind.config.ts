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
        klea_box_border: "#DDDDDD",
        klea_box_border2: "#EEEEEE",

        klea_text_disabled: "#AAAAAA",
        klea_text_primary: "#2F5BC1",
        klea_text_emphasize: "#2A52AE", // main color 90% + black mix

        klea_bg_gray: "#F8F8F8",
        klea_bg_deep_gray: "#F9F9F9",

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
        "unfold-down": "unfold-down 0.5s east-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("daisyui")],
  safelist: [
    "transition-colors",
    "hover:text-klea_text_primary",
    "active:text-klea_text_primary",
    "hover:font-bold",
    "active:font-bold",
    "active:bg-klea_text_emphasize",
    "hover:bg-klea_text_emphasize",
  ],

  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#2F5BC1",
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
