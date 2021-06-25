module.exports = {
    root: true,
    ignorePatterns: [
        'projects/**/*'
    ],
    overrides: [
        {
            files: [
                '*.js'
            ],
            env: {
                browser: true,
                node: true,
                'es6': true
            },
            parserOptions: {
                ecmaVersion: 2020
            },
            extends: 'eslint:recommended'
        },
        {
            files: [
                '*.ts'
            ],
            plugins: [
                '@typescript-eslint',
                'eslint-plugin-tsdoc'
            ],
            parserOptions: {
                project: [
                    'tsconfig.json'
                ],
                createDefaultProgram: true
            },
            extends: [
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
                'plugin:@angular-eslint/recommended',
                'plugin:@angular-eslint/template/process-inline-templates'
            ],
            rules: {
                'tsdoc/syntax': 'error',
                quotes: [
                    'error',
                    'single',
                    {
                        avoidEscape: true
                    }
                ],
                'no-console': [
                    'error',
                    {
                        allow: [
                            'warn',
                            'info'
                        ]
                    }
                ],
                '@typescript-eslint/typedef': [
                    'error',
                    {
                        arrayDestructuring: false,
                        arrowParameter: false
                    }
                ],
                '@typescript-eslint/no-inferrable-types': [
                    'error',
                    {
                        ignoreParameters: true,
                        ignoreProperties: true
                    }
                ],
                '@typescript-eslint/type-annotation-spacing': 'error',
                '@typescript-eslint/explicit-member-accessibility': [
                    'error',
                    {
                        overrides: {
                            constructors: 'off',
                            accessors: 'off'
                        }
                    }
                ],
                '@angular-eslint/component-class-suffix': [
                    "warn",
                    {
                        "suffixes": ["Component", "Widget", "Control"]
                    }
                ],
                // Off
                '@angular-eslint/component-selector': [
                    'off',
                    {
                        prefix: 'xm',
                        style: 'kebab-case',
                        type: 'element'
                    }
                ],
                '@angular-eslint/directive-selector': [
                    'off',
                    {
                        prefix: 'xm',
                        style: 'camelCase',
                        type: 'attribute'
                    }
                ],
                // Waiting for the fixed
                '@angular-eslint/no-host-metadata-property': 'warn',
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
                '@typescript-eslint/unbound-method': [
                    'warn',
                    {
                        ignoreStatic: true
                    }
                ],

            }
        },
        {
            files: [
                '*.html'
            ],
            extends: [
                'plugin:@angular-eslint/template/recommended'
            ],
            rules: {}
        }
    ]
}
