/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // colors
      colors: {
        primary: "#2B85FF",
        secondary: "#EF963E",
      },
    },
  },
  plugins: [],
};
