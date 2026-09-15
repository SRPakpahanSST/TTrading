import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  // ============================================================
  // KONFIGURASI DASAR
  // ============================================================
  {
    ignores: [
      'dist/**',
      'build/**',
      'node_modules/**',
      'coverage/**',
      '*.min.js',
      'public/**',
    ],
  },

  // ============================================================
  // FILE JAVASCRIPT & JSX
  // ============================================================
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // ============================================================
      // ATURAN DASAR ESLINT
      // ============================================================
      ...js.configs.recommended.rules,
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      'no-alert': 'warn',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'warn',
      'no-duplicate-imports': 'error',
      'no-unreachable': 'error',
      'no-constant-condition': 'warn',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-extra-semi': 'error',
      'no-irregular-whitespace': 'error',
      'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
      'no-trailing-spaces': 'error',
      'eol-last': ['error', 'always'],
      'quotes': ['warn', 'single', { avoidEscape: true }],
      'semi': ['error', 'never'],
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always',
        },
      ],
      'keyword-spacing': ['error', { before: true, after: true }],
      'space-infix-ops': 'error',
      'arrow-spacing': ['error', { before: true, after: true }],
      'template-curly-spacing': ['error', 'never'],
      'no-multi-spaces': 'error',
      'indent': ['error', 2, { SwitchCase: 1 }],

      // ============================================================
      // ATURAN REACT
      // ============================================================
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
      'react/jsx-no-target-blank': 'warn',
      'react/jsx-key': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-undef': 'error',
      'react/jsx-pascal-case': 'error',
      'react/no-array-index-key': 'warn',
      'react/no-unescaped-entities': 'warn',
      'react/self-closing-comp': 'warn',
      'react/jsx-boolean-value': ['warn', 'never'],
      'react/jsx-curly-brace-presence': [
        'warn',
        { props: 'never', children: 'never' },
      ],
      'react/jsx-fragments': ['warn', 'syntax'],
      'react/jsx-no-useless-fragment': 'warn',
      'react/function-component-definition': [
        'warn',
        {
          namedComponents: 'function-declaration',
          unnamedComponents: 'arrow-function',
        },
      ],

      // ============================================================
      // ATURAN REACT HOOKS
      // ============================================================
      ...reactHooks.configs.recommended.rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // ============================================================
      // ATURAN REACT REFRESH (untuk Vite HMR)
      // ============================================================
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },

  // ============================================================
  // FILE KONFIGURASI (Node.js)
  // ============================================================
  {
    files: ['*.config.js', '*.config.cjs', '*.config.mjs', 'vite.config.js', 'tailwind.config.js', 'postcss.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-console': 'off',
    },
  },

  // ============================================================
  // FILE TEST
  // ============================================================
  {
    files: ['**/*.test.{js,jsx}', '**/*.spec.{js,jsx}', 'tests/**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      'no-console': 'off',
    },
  },

  // ============================================================
  // FILE SERVICE WORKER (PWA)
  // ============================================================
  {
    files: ['**/service-worker.js', '**/sw.js'],
    languageOptions: {
      globals: {
        ...globals.serviceworker,
      },
    },
    rules: {
      'no-console': 'off',
    },
  },
]