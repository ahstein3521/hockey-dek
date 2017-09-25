const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: './client/index.js',
  output: {
    path: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },      
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        include : path.join(__dirname, 'icons'),
        loader  : 'url-loader?limit=30000&name=icons/[name].[ext]'
      }      
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/index.html'
    }),
    new ExtractTextPlugin('style.css')
  ]
};
