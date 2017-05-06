'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');
const owWebuiKitAssetPath = path.join(__dirname, '/../node_modules/ow-webui-kit/dist');
const bootstrapSassStylesPath = path.join(__dirname, '/../node_modules/bootstrap-sass/assets/stylesheets/');

module.exports = {
  entry: {
    client: [
      './src/App.js'
    ]
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  devServer: {
    publicPath: '/',
    compress: true,
    port: 9002
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: 'inline'
              }
            }
          ]
        })
      },
      {
        test: /\.(scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                import: true,
                url: true
              }
            },
            {
              loader: 'resolve-url-loader'
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [
                  owWebuiKitAssetPath,
                  bootstrapSassStylesPath
                ]
              }
            }
          ]
        })
      },
      {
        test: /\.(ico|gif|png|jpg|jpeg|svg|webp)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'images/[name].[ext]',
            limit: 1,
          }
        }
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
            name: 'fonts/[name].[ext]'
          }
        }
      },
      {
        test: /\.ttf(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/octet-stream',
            name: 'fonts/[name].[ext]'
          }
        }
      },
      {
        test: /\.eot(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        }
      }
    ],
    noParse: /\.min\.js/
  },
  resolve: {
    extensions: ['.jsx', '.js', '.scss', '.css', '.json']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: (module) => (module.context && module.context.indexOf('node_modules') >= 0)
    }),
    new HtmlWebpackPlugin({
      title: 'My App',
      filename: 'index.html',
      template: 'src/index.ejs'
    }),
    new ExtractTextPlugin('styles.bundle.css'),
    new webpack.NoEmitOnErrorsPlugin() // prevents emitting of assets if error
  ]
};
