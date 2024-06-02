import js from '@eslint/js';
import globals from 'globals';
import stylisticJs from '@stylistic/eslint-plugin-js';

export default [
    js.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.browser
            }
        },
        plugins: {
            '@stylistic/js': stylisticJs
        },
        rules: {
            '@stylistic/js/indent': [
                'error',
                4,
                { SwitchCase: 1 }
            ],
            '@stylistic/js/linebreak-style': [
                'error',
                'unix'
            ],
            '@stylistic/js/quotes': [
                'error',
                'single',
                { allowTemplateLiterals: true }
            ],
            '@stylistic/js/semi': [
                'error',
                'always'
            ],
            '@stylistic/js/no-trailing-spaces': ['error', { skipBlankLines: true }],
            camelcase: ['off'],
            'prefer-const': ['error'],
        }
    }
];
