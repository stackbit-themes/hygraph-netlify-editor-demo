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
        light: "#fff",
        dark: "#333333",
        primary: "#693A25",
        secondary: "#AE9A91",
        tertiary: "#EEE0DB",
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        title: ['var(--font-plus-jakarta-sans)'],
      },
    },
  },
  plugins: [],
};
export default config;
