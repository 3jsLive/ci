// const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const path = require( 'path' );
function resolve( dir ) {

	return path.join( __dirname, dir );

}

module.exports = {
	// alt
	devServer: {
		proxy: {
			"/api/ci/*": {
				changeOrigin: true,
				target: "http://127.0.0.1:9872/",
				// target: "http://compaq.local:8855",
				secure: false,
				pathRewrite: {
					'^/api/ci': ''
				}
			}
		}
	},
	configureWebpack: {
		// alt
		output: {
			filename: '[name].js'
		},
		// alt
		/* plugins: [
			new HtmlWebpackPlugin( {
				filename: 'index.html',
				template: './public/index.html',
				chunks: [ 'chunk-vendors', 'chunk-common', 'main' ]
			} )
		], */
		// neu
		resolve: {
			alias: {
				'@': resolve( '.' ),
				vue$: "vue/dist/vue.esm.js",
				vuex$: "vuex/dist/vuex.esm.js"
			}
		}
		// devtool: 'eval-source-map'
	},
	chainWebpack: config => {

		// alt
		// config.resolve.alias
		// 	.set( '@', resolve( '.' ) );

		// neu Bootstrap.native loader
		config.module
			.rule( 'bootstrap.native-loader' )
			.test( /bootstrap\.native/ )
			.use( 'bootstrap.native-loader' )
			.loader( 'bootstrap.native-loader' )
			.options( {

				// ['alert', 'button',  'carousel', 'collapse', 'dropdown', 'modal', 'popover', 'scrollspy', 'tab', 'tooltip']
				only: [ 'button', 'collapse' ]
				// ignore: [ 'alert', 'carousel', 'dropdown', 'modal', 'scrollspy', 'tooltip', 'popover', 'tab' ]

			} )
			.end();

	}

};
