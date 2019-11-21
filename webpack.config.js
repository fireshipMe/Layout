const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

const config = {
  entry: {
    app: './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].bundle.js",
  },
  devServer: {
    port: 3000,
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: './src/index.pug'
      }),
      new MiniCssExtractPlugin({
          filename: "style.css",
          chunkFilename: "[name].css"
      })
  ],
  module: {
      rules: [
          {
                test: /\.pug$/,
                use: [
                        "pug-loader",
                    ],
            },
          {
              test: /\.scss$/,
              use: [
                  MiniCssExtractPlugin.loader,
                  {
                      loader: "css-loader",
                      options: {
                          modules: true
                      },    
                  },
                  "sass-loader"
              ]
          }
      ]
  }

};
module.exports = (env, argv) => {
if (argv.mode === 'development') {}
 if (argv.mode === 'production') {}
return config;
}