const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    'bundle.js': './src/game.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]',
  },
  module: {
    loaders: [
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
      }
    ],
  },
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 8080,
      server: { baseDir: path.resolve(__dirname, '') },
      reloadDelay: 500,
    }),
    new UglifyJsPlugin({
      test: /\.js$/i,
      uglifyOptions: {
        ie8: false,
        ecma: 8,
        output: {
          comments: false,
        },
        mangle: true,
        compress: {
          sequences: true,
          dead_code: true,
          conditionals: true,
          booleans: true,
          unused: true,
          if_return: true,
          join_vars: true,
        }
      }
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, ''),
  },
};
