const path = require("path");
const merge = require("webpack-merge");

require("dotenv").config();

const baseConfig = require("./config/webpack/config.base");

const sourceDir = path.join(__dirname, "./src");
const distDir = path.join(__dirname, "./dist");


module.exports = (env, argv) => {

  const paths = { distDir, sourceDir };
  const base = baseConfig(paths);
  const devMode=merge(base);

  return devMode;
}