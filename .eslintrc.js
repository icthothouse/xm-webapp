module.exports = {
    root: true,
    overrides: [
        {
            files: ['src/**/*.ts', 'packages/**/*.ts'],
            excludedFiles: '*.spec.js',
            parser: '@typescript-eslint/parser',
            parserOptions: {
                tsconfigRootDir: __dirname,
                project: ['./tsconfig.json'],
            },
            plugins: ['@typescript-eslint'],
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
            ],
            rules: {
                // Blocked by https://github.com/angular/angular/milestone/103
                '@typescript-eslint/no-unsafe-assignment': 'warn',
                '@typescript-eslint/restrict-template-expressions': 'warn',
                '@typescript-eslint/no-unsafe-member-access': 'warn',
                '@typescript-eslint/no-unsafe-call': 'warn',
                '@typescript-eslint/no-floating-promises': 'warn',
                '@typescript-eslint/restrict-plus-operands': 'warn',
                '@typescript-eslint/no-unsafe-return': 'warn',
                'no-prototype-builtins': 'warn',
                '@typescript-eslint/no-implied-eval': 'warn',
                '@typescript-eslint/ban-types': 'warn',
                '@typescript-eslint/prefer-regexp-exec': 'warn',
                '@typescript-eslint/no-misused-promises': 'warn',
                '@typescript-eslint/no-var-requires': 'warn',
                '@typescript-eslint/unbound-method': ['warn', { 'ignoreStatic': true }],
                // Error
                'no-console': ['error', { 'allow': ['warn', 'info'] }],
                '@typescript-eslint/typedef': ['error', {arrayDestructuring: false, arrowParameter: false}],
                '@typescript-eslint/no-inferrable-types': ['error', {
                    'ignoreParameters': true,
                    'ignoreProperties': true,
                }],
                '@typescript-eslint/type-annotation-spacing': ['error'],
                '@typescript-eslint/explicit-member-accessibility': ['error', {
                    overrides: { constructors: 'off', accessors: 'off' },
                }],
            },
        },
    ],
};
