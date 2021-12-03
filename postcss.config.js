const mode = process.env.NODE_ENV;
const dev = mode === "development";
module.exports = {
  plugins: {
    tailwindcss: {},
    "postcss-nested": {},
    autoprefixer: {},
    cssnano: !dev && {
      preset: ["default", { discardComments: { removeAll: true } }],
    },
  },
};
