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
        casualBlue:"#59ADF6",
        casualPurple:"#C780E8",
        casualRed:"#FF6961",
        casualOrange:"#FFB480",
        casualAqua:"#08CAD1",
        casualGreen:"#42D6A4",
        casualYellow:"#F8F38D",
        casualViolet:"#9D94FF",
      },
      animation: {
        'spin-slow': 'spin-backwards 20s linear infinite',
      },
      keyframes:{
        "spin-backwards":{
          "to": { transform: "rotate(-360deg)" }
        }
      }
    },
    fontFamily: {
      varela: ["Varela Round", "sans-serif"],
      sans: ["Rubik", "sans-serif"],
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
    require("tailwind-scrollbar"),
    require("tailwind-scrollbar-hide"),
    require("tailwindcss-border-gradient-radius"),
  ],
};
