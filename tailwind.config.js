/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */

const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
const flattenColorPalette = require("tailwindcss/lib/util/flattenColorPalette").default;
const plugin = require("tailwindcss/plugin");

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
const addVariablesForColors = ({ addBase, theme }) => {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  );

  addBase({
    ":root": newVars,
  });
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1360px",
      },
    },
    screens: {
      minscreen: "340px",
      xs3: "420px",
      xs: "460px",
      xs2: "500px",
      sm2: "700px",
      md2: "840px",
      ...defaultTheme.screens,
    },
    extend: {
      backgroundImage: {
        gradient:
          "linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82)",
        "secondary-gradient": "linear-gradient(60deg, #e68414,#F4D011)",
      },
      backgroundColor: {
        overlay: "hsla(0, 0%, 0%, 0.55)",
      },
      boxShadow: {
        red: "0px 4px 12px 0 rgba(174, 9, 9, 0.3)",
        orange: "0px 4px 12px 0 rgba(229, 141, 8, 0.3)",
        top: "20px 35px 60px -15px rgba(0, 0, 0, 0.3)",
        notLeft: "3px 3px 5px -4px rgba(0, 0, 0, 0.3)",
        image: "inset 0 2px 4px 0px hsla(0, 0%, 0%, 0.2)",
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
        text: "0 0 50px var(--tw-shadow-color)",
      },
      fontSize: {
        xs2: "0.6rem",
      },
      colors: {
        "surface-bg": "#F7F8FA",
        "text-primary": "#393939",
        "text-caption": "#6E6E6E",
        "tab-bg": "#F6F6F8",
        primary: "#E50815",
        secondary: "#E58D08",
        "secondary-light": "#EAA439",
        casualRed: "#FF695A",
        casualRedDarker: "#B92F27",
        casualRedOutline: "#fcaaa1",
        casualOrange: "#FFA033",
        casualOrangeDarker: "#C76A2A",
        casualOrangeOutline: "#FFC684",
        casualYellow: "#F6DE5C",
        casualYellowDarker: "#EDC908",
        casualYellowOutline: "#FFED8C",
        casualBrightGreen: "#ADFF6C",
        casualBrightGreenDarker: "#7ED321",
        casualBrightGreenOutline: "#D0FFB3",
        casualGreen: "#42D68C",
        casualGreenDarker: "#30A46A",
        casualGreenOutline: "#79E2AE",
        casualCyan: "#08CAD1",
        casualCyanDarker: "#05A6AD",
        casualCyanOutline: "#6BE8EA",
        casualAqua: "#59DAF6",
        casualAquaDarker: "#1DA6C3",
        casualAquaOutline: "#A8E8FF",
        casualSkyBlue: "#59ADF6",
        casualSkyBlueDarker: "#2A85D4",
        casualSkyBlueOutline: "#6DB7F8",
        casualSlateBlue: "#97B8FC",
        casualSlateBlueDarker: "#728ABC",
        casualSlateBlueOutline: "#AAC6FF",
        casualViolet: "#C780E8",
        casualVioletDarker: "#9756B5",
        casualVioletOutline: "#E2A5FF",
        casualPink: "#F07DD7",
        casualPinkDarker: "#CC41AE",
        casualPinkOutline: "#FFA8EC",
        gold: "#D4A017",
        goldDarker: "#A17A10",
        goldOutline: "#D4A017",
        casualGray: "#9A9A9A",
        casualGrayDarker: "#787878",
        casualGrayOutline: "#9A9A9A",
        darkOutline: "#78808c",
        lightOutline: "#eef2f6",
        blueOutline: "#6585DF",
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "16/9": "16 / 9",
      },
      animation: {
        "spin-slow": "spin-backwards 40s linear infinite",
        spinner: "spin-forwards 1s linear infinite",
        "scrollwheel-move-down": "animate-scrollwheel-move-down 2500ms ease infinite",
        "mobile-move-down": "animate-mobile-move-down 2500ms ease infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;",
        shimmer: "shimmer 3s ease-out infinite alternate",
        text: "text 5s ease infinite",
      },
      gridTemplateColumns: {
        "auto-fit": "repeat(auto-fit, minmax(100%, 1fr))",
        // grid-template-columns: repeat(auto-fit, minmax(9%, 1fr));
      },
      keyframes: {
        "spin-backwards": {
          to: { transform: "rotate(-360deg)" },
        },
        "spin-forwards": {
          to: { transform: "rotate(360deg)" },
        },
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        shimmer: {
          "0%": { backgroundPosition: "0 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "animate-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "animate-scrollwheel-move-down": {
          "0%": {
            transform: "translateY(0)",
            opacity: 0,
          },
          "20%": {
            transform: "translateY(0)",
            opacity: 1,
          },
          "100%": {
            transform: "translateY(10px)",
            opacity: 0,
          },
        },
        "animate-mobile-move-down": {
          "0%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        pulse: {
          "0%": {
            opacity: 1,
          },
          "50%": {
            opacity: 0.5,
          },
          "100%": {
            opacity: 1,
          },
        },
      },
    },
    fontFamily: {
      sans: "var(--rubik-font)",
      //   sans: ["var(--font-rubik)", ...fontFamily.sans],
      number: "var(--quicksand-font)",
      //   baloo: ["baloo-2", "cursive"],
      //   quicksand: ["Quicksand", "sans-serif"],
      catamaran: "var(--main-font)",
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
      spin: "animate-spin 1s linear infinite",
    },
    linearBorderGradients: () => ({
      colors: {
        "light-green": [colors.emerald[500], colors.green[500], colors.lime[500]],
        "light-blue": [colors.teal[500], colors.emerald[500], colors.green[500]],
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
    require("tailwindcss-animate"),
    require("tailwindcss-border-gradient-radius"),
    addVariablesForColors,
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "text-shadow": value => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") },
      );
    }),
  ],
};
