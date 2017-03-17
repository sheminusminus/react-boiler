var path = require('path');
var webpack = require('webpack');

const SRC_FOLDER = path.join(__dirname, 'src/app')
const DIST_FOLDER = path.join(__dirname, 'dist')

module.exports = {
	devtool: '#source-map',
	entry: {
		app: [path.join(SRC_FOLDER, 'App.js')]
	},
	output: {
		publicPath: '/',
		path: DIST_FOLDER,
		filename: 'js/bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets:['es2015', 'react']
				}
			},
			{
				test: /\.json$/, loader: 'json'
			}
		]
	},
	resolve: {
		root: process.cwd(),
		modulesDirectories: ['node_modules'],
		extensions: ['', '.js']
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.NoErrorsPlugin()
	],
	target: 'web'
};
