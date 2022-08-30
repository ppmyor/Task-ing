/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        google: {
          100: "rgb(66, 133, 244)",
          200: "rgb(51, 122, 244)",
        },
        kakao: {
          100: "rgb(247, 227, 54)",
          200: "rgb(240, 202, 48)",
        },
        github: {
          100: "#8B949E",
          200: "#0D1117",
        },
        facebook: {
          100: "#4267b2",
          200: "#29487d",
        },
<<<<<<< HEAD
        naver: {
          100: "#2DB400",
          200: "#00B900",
        },
=======
>>>>>>> b2a06ef3d79905add6fd57a31e3e262c82313e31
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark", "light"],
  },
};
