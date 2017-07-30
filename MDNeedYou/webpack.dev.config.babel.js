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
	devtool: 'source-map', /*'cheap-module-eval-source-map',*/
	entry: {
		app: [
			//'react-hot-loader/patch',
			//'webpack/hot/only-dev-server',
			'./index.js'
		]
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].bundle.js',
		chunkFilename: '[chunkhash].chunk.js'
	},
	module: {
		rules: [
			{ test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader', options: babelConfig },
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] },
			{ test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
			{ test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
			{ test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/, loader: 'url-loader?limit=100000' },
		]
	},
	plugins: [
		//new CleanWebpackPlugin(path.join(__dirname, 'dist'), { verbose: true }),
		new HtmlWebpackPlugin({ template: './index.html' }),
		new webpack.HotModuleReplacementPlugin(),
		//new webpack.optimize.ModuleConcatenationPlugin(),
		new CopyWebpackPlugin([
			{ from: 'styles/img/*.*' },
			{ from: 'styles/img/team/*.*' },
			{ from: 'styles/img/about/*.*' },
			{ from: 'styles/img/logos/*.*' },
			{ from: 'styles/img/portfolio/*.*' }
		], { copyUnmodified: true }),
		//new WriteFilePlugin()
	],
	devServer: {
		//hot: true // Check out react-hot-loader
	}
};
