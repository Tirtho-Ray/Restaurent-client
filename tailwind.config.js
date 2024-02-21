/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        Honk:['Honk',' system-ui'],
        Bebas:['Bebas Neue','sans-serif'],
        BBlack:['Black Ops One'],
        Rowdies:[ 'Rowdies', "sans-serif"]
      }
    },
  },
  plugins: [require("daisyui")],
}

