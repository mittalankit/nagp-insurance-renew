const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;

module.exports = merge(common, {
    mode: 'development',

    devServer: {
        port: 8080,
        historyApiFallback: true,
    },

    output: {
        publicPath: "http://localhost:8080/",
    },

    plugins: [
        new ModuleFederationPlugin({
          name: "Insurance APP",
          filename: "remoteEntry.js",
          exposes: {},
          shared: {
            ...deps,
            react: {
              singleton: true,
              eager: true,
              requiredVersion: deps.react,
            },
            "react-dom": {
              singleton: true,
              requiredVersion: deps["react-dom"],
            },
          },
        }),
        new HtmlWebPackPlugin({
          template: "./src/index.html",
        }),
      ]
});
