module.exports = {
	root: true,
	env: {
		browser: true,
		'cypress/globals': true
	},
	extends: [
		'plugin:vue/essential',
		"plugin:vue/recommended",
		'mdcs',
	],
	plugins: [
		'vue',
		'cypress'
	],
	parserOptions: {
		parser: "babel-eslint",
		ecmaVersion: 2018
	}
};
