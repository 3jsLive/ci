const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const path = require( 'path' );
function resolve( dir ) {

	return path.join( __dirname, dir );

}

module.exports = {
	devServer: {
		proxy: {
			"/api/*": {
				changeOrigin: true,
				target: "http://localhost:8855",
				// target: "http://compaq.local:8855",
				secure: false,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	},
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
				chunks: [ 'chunk-vendors', 'chunk-common', 'main' ]
			} )
		],
		devtool: 'eval-source-map'
	},
	chainWebpack: config => {

		config.resolve.alias
			.set( '@', resolve( '.' ) );

	}

};
