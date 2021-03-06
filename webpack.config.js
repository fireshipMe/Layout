const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpack = require('webpack');

const path = require('path');

const config = {
  entry: {
    app: './src/js/index.js'
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
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: './src/html/views/authorisation/login.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'register.html',
      template: './src/html/views/authorisation/register.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'room-details.html',
      template: './src/html/views/room-details/room-details.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'room-search.html',
      template: './src/html/views/room-search/room-search.pug'
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
      chunkFilename: "[name].css"
    }),
    new CopyWebpackPlugin([{
      from: './src/images',
      to: './images'
    }]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      "window.jQuery": "jquery'",
      "window.$": "jquery"      

    })


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
              modules: false,
              url: false
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
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/js'),
        include: path.resolve(__dirname, 'src/html/includes/drop_down'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: 'env'
          }
        }
      }
    ]
  }

};
module.exports = (env, argv) => {
  if (argv.mode === 'development') { }
  if (argv.mode === 'production') { }
  return config;
}