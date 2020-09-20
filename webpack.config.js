const path = require("path");

const targets = [
  { name: "web", supports: { chrome: 58, ie: 9 } },
  { name: "node", supports: { node: "current" } }
];

const configs = targets.map(target => ({
  mode: "production",
  target: target.name,
  entry: "./src/zzosort.js",
  output: {
    library: "ZzoSort",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "lib"),
    filename: "zzosort." + target.name + ".js",
    globalObject: "this"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: [
          {
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
                ]
              ],
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "entry",
                    targets: target.supports,
                    corejs: 3
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /test\.js$/,
        exclude: /node_modules/,
        use: "mocha-loader"
      }
    ]
  }
}));

module.exports = configs;
