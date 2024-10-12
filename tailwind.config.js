const { AspectRatio } = require("@mui/icons-material");
const colors = require("tailwindcss/colors");
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        "light-blue": colors.lightBlue,
        cyan: colors.cyan,
        customDark: "#0D0106",
        zeffre: "#3626A7",
        claucous: "#657ED4",
        scarlet: "#FF331F",
        ghatWhite: "#FBFBFF",
      },

      AspectRatio: {
        "1/2": "1/2",
      },
    },
  },
  variants: { extend: {} },
  plugins: [],
};
