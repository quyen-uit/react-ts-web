import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginImport from 'eslint-plugin-import';
import prettierConfig from 'eslint-config-prettier';
import pluginReactCompiler from 'eslint-plugin-react-compiler';

export default tseslint.config(
  // Global ignores
  {
    ignores: ['dist', 'node_modules', '.vscode'],
  },

  // Base configurations for all files
  ...tseslint.configs.recommended,

  // React specific configurations
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.app.json',
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'jsx-a11y': pluginJsxA11y,
      import: pluginImport,
      'react-compiler': pluginReactCompiler,
    },
    rules: {
      // Recommended rules for React
      ...pluginReact.configs.recommended.rules,
      // Recommended rules for React Hooks
      ...pluginReactHooks.configs.recommended.rules,
      // Recommended rules for JSX A11y
      ...pluginJsxA11y.configs.recommended.rules,
      // Recommended rules for imports
      ...pluginImport.configs.recommended.rules,

      // React Compiler rules
      'react-compiler/react-compiler': 'error',

      // Custom rules
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      'react/react-in-jsx-scope': 'off', // Not needed with the new JSX transform
      'react/prop-types': 'off', // Not needed when using TypeScript
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
  },

  // Prettier configuration to disable conflicting rules
  prettierConfig
);
