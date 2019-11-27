const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
    new HtmlWebpackPlugin({
      filename: 'landing.html',
      template: './src/html/views/landing/landing.pug'
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
      chunkFilename: "[name].css"
    }),
    new CopyWebpackPlugin([{
      from: './src/images',
      to: './images'
    }])
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: "pug-loader"
      },
      {
        test: /\.scss$/,

        use: [
          MiniCssExtractPlugin.loader,
          {

            loader: "css-loader",
            options: {
              modules: false
            },
          },
          "sass-loader"
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
        }
        ]
      }
    ]
  }

};
module.exports = (env, argv) => {
  if (argv.mode === 'development') { }
  if (argv.mode === 'production') { }
  return config;
}