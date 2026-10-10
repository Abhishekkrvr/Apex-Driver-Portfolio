import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        asphalt: "#0B0B0D",
        panel: "#141418",
        line: "#26262C",
        accent: "#C8FF2E",
        bone: "#F2F0EA",
      },
      fontFamily: {
        display: ["Anton", "Impact", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
