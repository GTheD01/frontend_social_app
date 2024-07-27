/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        section: "calc(100% - 24rem)",
      },
    },
  },
  plugins: [],
};
