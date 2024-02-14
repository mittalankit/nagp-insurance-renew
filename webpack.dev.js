const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;

const remotes = {
  hangman_game: "hangman@https://mittalankit.github.io/nagp-hangman/remoteEntry.js",
  tictactoe_game: "tictactoe@https://mittalankit.github.io/nagp-tictactoe/remoteEntry.js",
};

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
          name: "caw_container",
          filename: "remoteEntry.js",
          remotes: remotes,
          exposes: {},
          shared: {
            ...deps,
            react: {
              singleton: true,
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
