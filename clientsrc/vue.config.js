const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = {
  publicPath: process.env.NODE_ENV === "development" ? "/vuejs-pwa/":"",
  outputDir,
  configureWebpack: {
    plugins: [new GenerateSW()]
  }
};