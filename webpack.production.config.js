'use strict';

const webpack = require('webpack');
const baseConfig = require('./webpack.config.js');

const config = Object.assign({}, baseConfig, {
  devtool: '#cheap-module-source-map'
});

config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({'process.env': {NODE_ENV: '"production"'}}),
  new webpack.optimize.UglifyJsPlugin({
    debug: true,
    compress: true,
    sourceMap: false,
    output: {
      comments: false
    },
    compressor: {
      warnings: false
    }
  }),
]);

module.exports = config;
