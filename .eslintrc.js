module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
	  ecmaVersion: 2020,
	  sourceType: 'module'
	},
	plugins: ['@typescript-eslint', 'react', 'react-hooks'],
	extends: [
	  'eslint:recommended',
	  'plugin:react/recommended',
	  'plugin:react-hooks/recommended',
	  'plugin:@typescript-eslint/recommended',
	  'prettier'
	],
	rules: {
	  // Suas regras personalizadas
	},
	settings: {
	  react: {
		version: 'detect'
	  }
	}
  };
