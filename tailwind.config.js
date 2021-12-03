module.exports = {
  mode: "jit",
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {},
  variants: {},
  plugins: [
    require('tailwindcss-debug-screens'),
    require('tailwindcss-question-mark'),
    require("daisyui"),
  ],
  daisyui: {
    logs: false,
    themes: [
      "garden",
      "dark",
    ],
  },
};
