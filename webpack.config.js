const path = require("path");

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: "./src/zzosort.js",
  output: {
    library: "zzosort",
    filename: "zzosort.js",
    path: path.resolve(__dirname, "dist")
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            sourceType: "module",
            plugins: [
              [
                "@babel/plugin-transform-runtime",
                {
                  corejs: 3,
                  useESModules: true
                }
              ],
              ["@babel/plugin-proposal-class-properties"]
            ],
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "entry",
                  targets: { chrome: 58, ie: 9 },
                  corejs: 3
                }
              ]
            ]
          }
        }
      }
    ]
  }
};
