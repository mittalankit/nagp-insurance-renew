const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;


module.exports = merge(common, {
    mode: 'production',

    output: {
        publicPath: "https://mittalankit.github.io/nagp-insurance-detail/",
    },

    plugins: [
        new ModuleFederationPlugin({
          name: "nagp_insurance_detail",
          filename: "remoteEntry.js",
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
      ],
});
