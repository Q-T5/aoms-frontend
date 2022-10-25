/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
	"./index.html",
	"./src/**/*.{vue,js}"
],
  theme: {
    extend: {
      fontFamily: {
        "nunito": ["Nunito", "sans-serif"],
        "oswald": ["Oswald", "sans-serif"],
        "poppins": ["Poppins", "sans-serif"],
        "roboto": ["Roboto", "sans-serif"]
      },
    },
  },
  plugins: [
  	require("daisyui"),
  	require("tailwind-scrollbar")
  ],
  "daisyui": {
	  "prefix": "daisyui-"
  },
  "variants": {
    "scrollbar": ["rounded"]
  }
}
