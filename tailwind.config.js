/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",

  ],
  theme: {
    extend: {
     colors: {
       primary : "#536769",
       dark: {
         light: "#6E7BAD",
         hard: "#434962",
         soft: "#4A557F",
         },
     },
       fontFamily: {
       opensans : ["'Open Sans'", "sans-serif"],
        roboto: ["'Roboto'", "sans-serif"],
 
 
     }
 
    },
   },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],

  daisyui: {
    themes: [], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
     // name of one of the included themes for dark mode
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: 'd-',
  },


};

