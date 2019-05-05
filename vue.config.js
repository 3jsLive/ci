const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

module.exports = {
	configureWebpack: {
		entry: {
			'main': [ './src/App.js' ]
		},
		output: {
			filename: '[name].js'
		},
		plugins: [
			new HtmlWebpackPlugin( {
				filename: 'index.html',
				template: './public/index.html',
				chunks: [ 'main' ]
			} )
		],
		devtool: 'eval-source-map'
	}
};
