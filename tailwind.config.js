/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}', "./node_modules/svhighlight/**/*.svelte"],
  theme: {

    fontFamily: {
      sans: ["'Source Code Pro'", 'sans-serif']
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: ["retro"], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]

  },
}

