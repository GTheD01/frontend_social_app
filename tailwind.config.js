/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        section: "calc(100% - 24rem)",
      },
      gridTemplateColumns: {
        profile: "1fr 2fr",
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "9/16": "9 / 16",
      },
    },
  },
  plugins: [],
};
