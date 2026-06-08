import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#FFFFFF",
        anchor: "#185FA5",
        clarity: "#378ADD",
        mist: "#B5D4F4",
        frost: "#E6F1FB",
        midnight: "#263e4d",
      },
      fontFamily: {
        sans: ["var(--font-ubuntu)", "system-ui", "sans-serif"],
        display: ["var(--font-dirtyline)", "var(--font-ubuntu)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
