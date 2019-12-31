const merge = require("webpack-merge");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const Visualizer = require("webpack-visualizer-plugin");

const baseConfig = require("./webpack.base.config");

const prodConfiguration = env => {
  return merge([
    {
      optimization: {
        minimizer: [new UglifyJsPlugin()]
        // splitChunks: {
        //   chunks: "all",
        //   maxInitialRequests: Infinity,
        //   minSize: 0,
        //   cacheGroups: {
        //     leafletVendor: {
        //       test: /[\\/]node_modules[\\/](leaflet|react-leaflet)[\\/]/,
        //       name: "leaflet"
        //     },
        //     utilityVendor: {
        //       test: /[\\/]node_modules[\\/](core-js|react-select)[\\/]/,
        //       name: "utilityVendor"
        //     }
        //   }
        // }
      },

      plugins: [
        new MiniCssExtractPlugin(),
        new OptimizeCssAssetsPlugin(),
        new Visualizer({ filename: "./statistics.html" }),
        new CompressionPlugin({
          algorithm: "gzip",
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240,
          minRatio: 0
        })
      ]
    }
  ]);
};

module.exports = env => {
  return merge(baseConfig(env), prodConfiguration(env));
};
