module.exports = {
	root: true,
	env: {
		browser: true,
		jquery: true
	},
	extends: [
		'plugin:vue/essential',
		"plugin:vue/recommended",
		'mdcs',
	],
	plugins: [
		'vue'
	],
	parserOptions: {
		parser: 'babel-eslint',
		'ecmaVersion': 2018
	}
};
