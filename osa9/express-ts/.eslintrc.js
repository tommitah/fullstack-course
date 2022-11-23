module.exports = {
	'env': {
		'node': true,
		'es6': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking'
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module',
		'project': './tsconfig.json'
	},
	'plugins': [
		'@typescript-eslint'
	],
	'rules': {
		"@typescript-eslint/semi": ["error"],
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/restrict-template-expressions": "off",
		"@typescript-eslint/restrict-plus-operands": "off",
		"@typescript-eslint/no-unused-vars": [
			"error",
			{ "argsIgnorePattern": "^_" }
		],
		"no-case-declarations": "off",
	}
};
