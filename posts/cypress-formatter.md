---
title: 'CypressでESLintとPrettierを利用する'
date: '2021-11-01'
tags: ['Cypress']
---

テストといえどもコードはきれいに保ちたいです。  
Cypress + TypeScript 環境に ESLint と Prettier を導入します。
下記のコマンドとプロジェクトルートに`.eslintrc.js`を作成するだけで終わります。

```sh
npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-cypress @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

- `.eslintrc.js`

```js
module.exports = {
  plugins: ['cypress', '@typescript-eslint'],
  env: {
    browser: true,
    node: true,
    es6: true,
    'cypress/globals': true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:cypress/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
}
```

`.prettierrc.js`はお好みで。

## eslint-plugin-cypress

公式で Cypress 用の eslint の plugin が提供されています。詳しくは以下を御覧ください。
https://github.com/cypress-io/eslint-plugin-cypress

推奨設定も用意されており、`plugin:cypress/recommended`を追加しておけばいい感じに ESLint が怒ってくれます。
