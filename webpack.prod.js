const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
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
          use: [
            {loader: "style-loader"}, 
            {loader: "css-loader" }, 
            {loader: "sass-loader"}
          ]
      },      
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        include : path.join(__dirname, 'icons'),
        loader  : 'url-loader?limit=30000&name=icons/[name].[ext]'
      }      
    ]
  },  
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    }),
    new HtmlWebpackPlugin({
      template: 'client/index.html'
    }),
    new ExtractTextPlugin('style.css')    
  ]
}