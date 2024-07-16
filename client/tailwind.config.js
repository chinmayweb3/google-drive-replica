/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        mxxl: { max: "1440px" },
        mlg: { max: "1024px" },
        msm: { max: "500px" },
      },
    },
  },
  plugins: [],
};
