/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */

const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
const flattenColorPalette = require("tailwindcss/lib/util/flattenColorPalette").default;

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
const addVariablesForColors = ({ addBase, theme }) => {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
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
      ...defaultTheme.screens,
    },
    extend: {
      boxShadow: {
        red: "0px 4px 12px 0 rgba(174, 9, 9, 0.3)",
        orange: "0px 4px 12px 0 rgba(229, 141, 8, 0.3)",
        top: "20px 35px 60px -15px rgba(0, 0, 0, 0.3)",
        notLeft: "3px 3px 5px -4px rgba(0, 0, 0, 0.3)",
      },
      fontSize: {
        xs2: "0.6rem",
      },
      colors: {
        "surface-bg": "#F7F8FA",
        "text-primary": "#393939",
        "tab-bg": "#F6F6F8",
        primary: "#E50815",
        secondary: "#E58D08",
        "secondary-light": "#eaa439",
        casualRed: "#FF695A",
        casualOrange: "#FFA033",
        casualGreen: "#42D68C",
        casualAqua: "#08CAD1",
        casualSkyBlue: "#59ADF6",
        casualSlateBlue: "#97B8FC",
        casualViolet: "#C780E8",
        casualPink: "#F07DD7",
        casualRedDarker: "#B92F27",
        casualOrangeDarker: "#C76A2A",
        casualGreenDarker: "#30A46A",
        casualAquaDarker: "#05989D",
        casualSkyBlueDarker: "#2A85D4",
        casualSlateBlueDarker: "#728ABC",
        casualVioletDarker: "#9756B5",
        casualPinkDarker: "#CC41AE",
        casualRedOutline: "#fcaaa1",
        casualOrangeOutline: "#FFC684",
        casualGreenOutline: "#79E2AE",
        casualAquaOutline: "#26E2E9",
        casualSkyBlueOutline: "#6DB7F8",
        casualSlateBlueOutline: "#AAC6FF",
        casualVioletOutline: "#E2A5FF",
        casualPinkOutline: "#FFA8EC",
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
  ],
};
