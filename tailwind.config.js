import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    // ...
    // make sure it's pointing to the ROOT node_module
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      prefix: "heroui", // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "light", // default theme from the themes object
      defaultExtendTheme: "light", // default theme to extend on custom themes
      layout: {
        disabledOpacity: "0.5",
      },
      themes: {
        light: {
          colors: {
            default: {
              50: "#fafafa",
              100: "#f2f2f3",
              200: "#ebebec",
              300: "#e3e3e6",
              400: "#dcdcdf",
              500: "#d4d4d8",
              600: "#afafb2",
              700: "#8a8a8c",
              800: "#656567",
              900: "#404041",
              foreground: "#000",
              DEFAULT: "#d4d4d8",
            },
            primary: {
              50: "#f0fdf4",
              100: "#dcfce7",
              200: "#bbf7d0",
              300: "#86efac",
              400: "#4ade80",
              500: "#3aac0f",
              600: "#2e8b0c",
              700: "#246c09",
              800: "#1a4d06",
              900: "#102f03",
              foreground: "#fff",
              DEFAULT: "#3aac0f",
            },
          },
        },
        dark: {
          colors: {
            default: {
              50: "#0d0d0e",
              100: "#19191c",
              200: "#26262a",
              300: "#323238",
              400: "#3f3f46",
              500: "#65656b",
              600: "#8c8c90",
              700: "#b2b2b5",
              800: "#d9d9da",
              900: "#ffffff",
              foreground: "#fff",
              DEFAULT: "#3f3f46",
            },
            primary: {
              50: "#002147",
              100: "#003571",
              200: "#00489b",
              300: "#005cc4",
              400: "#006fee",
              500: "#2d88f1",
              600: "#59a1f4",
              700: "#86bbf7",
              800: "#b3d4fa",
              900: "#dfedfd",
              foreground: "#fff",
              DEFAULT: "#006fee",
            },
          },
        },
      },
    }),
  ],
};

export default config;
