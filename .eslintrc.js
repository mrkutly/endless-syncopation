module.exports = {
	parser: 'babel-eslint',
	parserOptions: {
		sourceType: 'module',
		allowImportExportEverywhere: true,
	},
	env: {
		'jest/globals': true,
		browser: true,
	},
	plugins: [
		'jest',
	],
	extends: [
		'airbnb',
	],
	rules: {
		'react/prop-types': 'off',
		'no-underscore-dangle': 0,
		'no-unused-vars': 1,
		'no-sequences': 1,
		'no-param-reassign': 0,
		'react/react-in-jsx-scope': 0,
		'react/jsx-indent': [
			2,
			'tab',
		],
		'react/jsx-indent-props': [
			2,
			'tab',
		],
		'max-len': [
			'error',
			120,
		],
		semi: [
			2,
			'never',
		],
		indent: [
			2,
			'tab',
		],
		'no-tabs': 'off',
	},
}
