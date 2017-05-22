import path from 'path';

import webpack from 'webpack';

import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WriteFilePlugin from 'write-file-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import babelConfig from './babel.config.json';

export default {
	watch: true,
	context: path.resolve(__dirname, 'source'),
	devtool: 'cheap-module-eval-source-map',
	entry: {
		app: './js/main',
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].bundle.js'
	},
	module: {
		rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader', options: babelConfig },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/, loader: 'url-loader?limit=100000' },
	  { test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery' },
		]
	},
	plugins: [
    // new CleanWebpackPlugin(path.join(__dirname, 'dist'), { verbose: true }),
		new HtmlWebpackPlugin({ template: './index.html' }),
		new webpack.HotModuleReplacementPlugin(),
		new CopyWebpackPlugin([
			{ from: 'styles/img/*.jpg' }, 
			{ from: 'styles/img/team/*.jpg' },
			{ from: 'styles/img/about/*.jpg' },
			{ from: 'styles/img/logos/*.jpg' },
			{ from: 'styles/img/portfolio/*.jpg' }
			], {copyUnmodified: true}),
		new webpack.ProvidePlugin({
			jQuery: 'jquery',
			$: 'jquery',
			jquery: 'jquery'
   		 }),
    // new WriteFilePlugin()
	],
	devServer: {
    // hot: true --> Check out react-hot-loader
	}
};
