import path from 'path';

import webpack from 'webpack';

import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import babelConfig from './babel.config.json';

export default {
  context: path.resolve(__dirname, 'source'),
  devtool: 'source-map',
  entry: {
    app: './js/main.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader', options: babelConfig },
      { test: /\.css$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }) },
      { test: /\.scss$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'sass-loader'] }) },
      { test: /\.less$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'less-loader'] }) },
      { test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/, loader: 'url-loader?limit=100000' },
      
    ]
  },
  plugins: [
    new CleanWebpackPlugin(path.join(__dirname, 'dist'), { verbose: true }),
    new webpack.optimize.UglifyJsPlugin({ output: { comments: false }, compressor: { warnings: false }, sourceMap: true }),
    new CopyWebpackPlugin([
			{ from: 'styles/img/*.*' }, 
			{ from: 'styles/img/team/*.*' },
			{ from: 'styles/img/about/*.*' },
			{ from: 'styles/img/logos/*.*' },
			{ from: 'styles/img/portfolio/*.*' }
			], {copyUnmodified: true}),
    new ExtractTextPlugin({ filename: 'styles.bundle.css' }),
    new HtmlWebpackPlugin({ template: './index.html' }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};
