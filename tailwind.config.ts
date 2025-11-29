import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "blue-550": "rgb(26, 115, 232)",
      },
      fontFamily: {
        novante: "var(--font-novante)",
      },
    },
  },
  plugins: [],
} satisfies Config;
