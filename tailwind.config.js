/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1C2321",
        paper: "#F5F3EC",
        panel: "#FBFAF6",
        pine: {
          DEFAULT: "#1F4B43",
          dark: "#153531",
          light: "#2E6459",
        },
        amber: {
          DEFAULT: "#B8863B",
          light: "#EFE1C3",
        },
        brick: {
          DEFAULT: "#C1443C",
          light: "#F4DAD8",
        },
        line: "#E3DFD2",
        muted: "#6B6A5F",
      },
      fontFamily: {
        sans: ["IBM Plex Sans", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
