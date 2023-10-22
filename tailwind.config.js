/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        josefinSans: ["Josefin Sans, sans-serif"]
      },
      colors: {
        // primary
        brightBlue: "hsl(220, 98%, 61%)",
        gradient1: "hsl(192, 100%, 67%)",
        gradient2: "hsl(280, 87%, 65%)",
        // light theme
        Light_veryLightGray: "hsl(0, 0%, 98%)",
        Light_veryLightGrayishBlue: "hsl(236, 33%, 92%)",
        lightGrayishBlue: "hsl(233, 11%, 84%)",
        Light_darkGrayishBlue: "hsl(236, 9%, 61%)",
        Light_veryDarkGrayishBlue: "hsl(235, 19%, 35%)",
        // dark theme
        veryDarkBlue: "hsl(235, 21%, 11%)",
        veryDarkDesaturatedBlue: "hsl(235, 24%, 19%)",
        lightGrayishBlue2: "hsl(234, 39%, 85%)",
        lightGrayishBlueHover: "hsl(236, 33%, 92%)",
        darkGrayishBlue: "hsl(234, 11%, 52%)",
        veryDarkGrayishBlue: "hsl(233, 14%, 35%)",
        veryDarkGrayishBlue2: "hsl(237, 14%, 26%)",
      }
    },
  },
  plugins: [],
}

