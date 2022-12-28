// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  // darkMode: "class",
  theme: {
    extend: {
      screens: {
        min: "340px",
        xs: "460px",
        xs2: "500px",
        // sm	640px
        // md	768px
        // lg	1024px
        // xl	1280px
        // 2xl 1536px
      },
      colors: {
        primary:"#E50815",
        casualRed: "#FF695A",
        casualOrange: "#FFA033",
        casualGreen: "#42D68C",
        casualAqua: "#08CAD1",
        casualSkyBlue: "#59ADF6",
        casualSlateBlue: "#97B8FC",
        casualViolet: "#C780E8",
        casualPink: "#F07DD7",
      },
      animation: {
        'spin-slow': 'spin-backwards 20s linear infinite',
      },
      keyframes:{
        "spin-backwards":{
          "to": { transform: "rotate(-360deg)" }
        }
      },
    },
    fontFamily: {
      varela: ["Varela Round", "sans-serif"],
      sans: ["Rubik", "sans-serif"],
      baloo: ["baloo-2", "cursive"],
      quicksand: ["Quicksand", "sans-serif"],
  },
    linearBorderGradients: () => ({
      colors: {
        "light-green": [
          colors.emerald[500],
          colors.green[500],
          colors.lime[500],
        ],
        "light-blue": [
          colors.teal[500],
          colors.emerald[500],
          colors.green[500],
        ],
        purple: [colors.blue[500], colors.pink[500], colors.purple[500]],
        gray: [colors.gray[300], colors.slate[100], colors.gray[300]],
      },
      background: {
        white: "#fff",
      },
    }),
  },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("tailwind-scrollbar-hide"),
    require("tailwindcss-border-gradient-radius"),
  ],
};
