const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('bundle.css');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: extractCSS.extract(['css-loader', 'sass-loader'])
      },
      {
        test: /\.(jpg|jpeg|gif|png|ico)$/,
        exclude: /node_modules/,
        loader: 'file-loader?name=[path][name].[ext]'
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=1024&name=fonts/[name].[ext]'
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015', { modules: false }]
            ]
          }
        }]
      }
    ]
  },
  plugins: [
    extractCSS
  ]
};
