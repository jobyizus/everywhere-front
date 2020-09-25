const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")

const WebappWebpackPlugin = require("webapp-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
    entry: {
      main: './src/index.js'
    },
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
      filename: '[name].js'
    },
    target: 'web',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          // Loads the javacript into html template provided.
          // Entry point is set below in HtmlWebPackPlugin in Plugins 
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              //options: { minimize: true }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        },
        {
         test: /\.(png|svg|jpg|gif)$/,
         use: ['file-loader']
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: distDir,
      }),
      new ForkTsCheckerWebpackPlugin({
        eslint: true,
        exclude: "node_modules",
      }),
          // PWA plugins
    new WebappWebpackPlugin({
      favicons: {
        appDescription: "Storefront for the Saleor e-commerce platform",
        appName: "Saleor",
        background: "#ddd",
        developerURL: null, // prevent retrieving from the nearest package.json
        display: "standalone",
        theme_color: "#333",
      },
      logo: `${sourceDir}/images/favicon.png`,
      prefix: "images/favicons/",
    }),
      new HtmlWebPackPlugin({
        template: "./src/html/index.html",
        filename: "./index.html",
        excludeChunks: [ 'server' ]
      })
    ],
    resolve: {
      alias: {
        // Explicitely set react's path here because npm-link doesn't do well
        // when it comes to peer dependencies, and we need to somehow develop
        // @saleor/sdk package
        react: path.resolve("./node_modules/react"),
        "react-dom": "@hot-loader/react-dom",
      },
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: "./tsconfig.json",
        }),
      ],
    },
  }