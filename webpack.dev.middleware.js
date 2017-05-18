const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.dev.js');

module.exports = webpackMiddleware(webpack(webpackConfig));