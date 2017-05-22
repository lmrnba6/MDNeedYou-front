import path from 'path';

import webpack from 'webpack';

import babelConfig from './babel.config.json';

export default {
  devtool: 'inline-source-map',
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader', options: babelConfig },
      { test: /\.css|scss|less|png|woff|woff2|eot|ttf|svg)$/, loader: 'ignore-loader' },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

// TODO configure Karma + Mocha + Chai + Sinon for testing 