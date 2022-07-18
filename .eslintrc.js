module.exports = {
    env: {
        es6: true,
        browser: true,
        es2021: true,
    },
    globals: {},
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    plugins: ['vue', '@typescript-eslint'],
};
