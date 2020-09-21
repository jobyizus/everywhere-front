const path = require("path");
const merge = require("webpack-merge");

/*
var cors = require('cors');
var express= require('express');
const app = express();
app.use('/public',function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // Set to true if you need the website to include cookies in the requests sent
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});
*/
require("dotenv").config();

const baseConfig = require("./config/webpack/config.base");
const devConfig = require("./config/webpack/config.dev");
const prodConfig = require("./config/webpack/config.prod");
const workerConfig = require("./config/webpack/config.worker");

const sourceDir = path.join(__dirname, "./src");
const distDir = path.join(__dirname, "./dist");

module.exports = (env, argv) => {
  const devMode = argv.mode !== "production";
  const sw = !!argv["service-worker"];
  const paths = { distDir, sourceDir };

  const base = baseConfig(paths);
  const worker = workerConfig(paths);
  const dev = sw
    ? merge(base, worker, devConfig(paths))
    : merge(base, devConfig(paths));
  const prod = merge(base, worker, prodConfig(paths));

  return devMode ? dev : prod;
};
