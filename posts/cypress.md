---
title: 'Cypress hands on'
date: '2021-10-24'
tags: ['Cypress']
---

Cypress を触る機会があったので、備忘録的にまとめていきます。

## Cypress とは

- オープンソースで開発されている JavaScript 製のフレームワーク
- ブラウザで実行されるものはすべてテストできると謳っている
- 具体的には以下のテスト
  - E2E Test
    - 基本的にこちらがメイン
  - Unit Test
    - `mocha` + `chai` ベース
      - つまり `Jest` を別に入れてるとめちゃくちゃ衝突する
  - API Test

## Cypress のいいところ

- ブラウザを利用したテストを行いたいときに`npm install cypress`すると全部入ってくる
  - Web Driver やリトライ機構など、複雑なところは隠蔽してくれているためすぐにテストを書ける
- E2E テスト
  - 失敗したときにスクリーンショットを自動で撮る
  - E2E テストの実行の様子をキャプチャして動画にしてくれる
  - 自動リトライ
    - レンダリング完了まで待機するようなコードを書かなくて良い
  - [クロスブラウザ対応](https://docs.cypress.io/guides/guides/launching-browsers#Browsers)
    - IE は未対応
  - GUI 完備
    - DOM 操作のスナップショットを取りながら履歴を残してくれる
      - デバッグが非常にしやすい
    - テスト結果をダッシュボードで表示
  - ヘッドレス対応

## 他ツールとの比較

E2E テストをやりたい、となったときによく上がるのが下記です。

- Selenium
- Puppeteer
- Test Cafe

### Cypress VS Selenium & Puppeteer

そもそも、Selenium と Puppeteer はテスティングツールではなく、ブラウザ操作自動化ツールです。  
Selenium だと Web Driver の管理が必要だったり、両方ともアサーション用のライブラリを自前で用意する必要があります。Cypress には E2E テスト開発を便利にしてくれる多くの機能があるため、E2E テストという観点では Cypress に軍配が上がるでしょう。

### Cypress VS Test Cafe

Test Cafe は非常に高機能で、Cypress と比べても遜色はない。というかむしろ Cypress より高機能です。下記の機能はもちろんサポートされています。

- 自動リトライ
- アサーション
  - 独自アサーション
- GUI
- TypeScript

Test Cafe 視点で Pros/Cons は以下です。

- Pros
  - IE 対応 ○
  - マルチウィンドウ/タブ操作ができる
  - 並列実行ができる
- Cons
  - Node で動いているので DOM とかは全部シリアライズされている
  - コミュニティが Cypress より小さい

Cypress で実現できない要件がある場合は TestCafe、そうでない場合は Cypress で良いと言うのが私の結論です。  
完全に主観だが、Cypress のほうが公式のサポートが手厚く、ドキュメントの整備もされている。GUI の UX(=デバッガビリティ)も良いです。  
Cypress は IE を完全に切り捨てているので、ここが大きなポイントになる可能性があります。

## Cypress のディレクトリ構成

1. `npm install cypress`
2. `npx cypress open`
3. GUI が開くので、サンプルのテストをクリックすると始まる

この状態では以下のディレクトリ構成になっているはずです。

```shell
> tree -I node_modules

├── cypress
│   ├── fixtures
│   │   └── example.json
│   ├── integration
│   │   ├── 1-getting-started
│   │   │   └── todo.spec.js
│   │   └── 2-advanced-examples
│   │       ├── actions.spec.js
│   │       ├── aliasing.spec.js
│   │       ├── assertions.spec.js
│   │       ├── connectors.spec.js
│   │       ├── cookies.spec.js
│   │       ├── cypress_api.spec.js
│   │       ├── files.spec.js
│   │       ├── local_storage.spec.js
│   │       ├── location.spec.js
│   │       ├── misc.spec.js
│   │       ├── navigation.spec.js
│   │       ├── network_requests.spec.js
│   │       ├── querying.spec.js
│   │       ├── spies_stubs_clocks.spec.js
│   │       ├── traversal.spec.js
│   │       ├── utilities.spec.js
│   │       ├── viewport.spec.js
│   │       ├── waiting.spec.js
│   │       └── window.spec.js
│   ├── plugins
│   │   └── index.js
│   └── support
│       ├── commands.js
│       └── index.js
├── cypress.json
├── package-lock.json
└── package.json
```

基本この構成から崩す必要はないです。それぞれ個別に説明します。

### cypress.json

設定ファイルです。公式のドキュメントがわかりやすいので説明は省きます。  
https://docs.cypress.io/guides/references/configuration

### fixtures

json や画像ファイルなど、固定データセットを配置します。  
エンコードの形式などもオプションで選択できます。
詳しくは以下です。
https://docs.cypress.io/api/commands/fixture

以下は公式のサンプル。json を読み込むときは import するか、`cy.fixture`にファイルのパスを直接わたして読み込みます。

```js
import user from '../fixtures/user.json'
it('loads the same object', () => {
  cy.fixture('user').then((userFixture) => {
    expect(user, 'the same data').to.deep.equal(userFixture)
  })
})
```

### integration

テストコードの配置場所です。
テストはメソッドチェーンの形で書けるので、とても直感的です。

```js
describe('app layout and responsiveness', () => {
    it('click test', () => {
        cy.visit('https://foo.example.com')
        // fooというcontentを持つDOMを取得 & 存在しなければアサーションエラー. セレクタも指定可能.
        cy.contains('foo')
            .click()
            .contains('success')
    }

    it('type test', () => {
        cy.visit('https://bar.example.com')
        const mailForm = cy.contains('mail address')
        mailForm
            .get('input').type('foo@example.com')
        mailForm
            .contains('submit').click()
    })
}
```

`contains`がとても協力で、セレクタを書く機会が劇的に減ります。  
他にも便利な API がたくさんあるので、ぜひご確認ください。  
https://docs.cypress.io/api/table-of-contents

### support

Cypress ではカスタムコマンドを定義でき、それらのコマンドや設定をこの`support`配下に配置します。  
E2E テストのデザインパターンとしてよく挙げられるのがページオブジェクトパターンです。が、このパターンは Cypress では推奨されていません。代わりにこちらのカスタムコマンドを使うことを推奨されています。  
なぜページオブジェクトパターンが推奨されていないのかは以下を御覧ください。  
https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/

カスタムコマンドには説明するより見たほうが早いと思いです。自動生成されたファイルを見てみましょう。

```sh
> cat cypress/support/commands.js

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... }
```

```sh
> cat cypress/support/index.js

// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
```

E2E テストを複数書いてみると、同じような操作が出てくるでしょう。例えば「アプリにログインする」「A を B に D&D する」などです。  
Cypress のデフォルトで提供されている API ではできないけど、定型化された操作はカスタムコマンドにしてしまうと良いです。  
次の例はログイン処理をカスタムコマンドに追加する例です。

```js
// support/commands.js
Cypress.Commands.add('login', (email, password) => {
  cy.visit()
  cy.contains('メールアドレス')
    .get('input')
    .type(email)
  cy.contains('パスワード')
    .get('input')
    .type(password))
  cy.contains('ログイン')
    .click()
})

// support/index.js
import './commands'

// test code
cy.login('foo@example.com', 'foo')
```

### plugins

現状、Cypress ではできないことや、生の API だけで実現するのは大変なことがいくつかあります。  
そういったものは提供されている plugin で解決できる可能性があります。(もちろん自分で plugin を書くこともできます)  
plugin を利用したい場合は、`plugins/index.js`に記載することで追加できます。  
例えばビジュアルリグレッションテストなどがいい例です。

1. plugin を install

```sh
npm install --save-dev cypress-image-snapshot
```

2. `plugins/index.js`で設定する

```js
const { addMatchImageSnapshotPlugin } = require('cypress-image-snapshot/plugin')

module.exports = (on, config) => {
  addMatchImageSnapshotPlugin(on, config)
}
```

3. `support`配下にコマンドを追加するスクリプトを書く

```js
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command'
addMatchImageSnapshotCommand()
```

4. テストを書く(refs: https://github.com/jaredpalmer/cypress-image-snapshot#syntax)

Cypress は他にも様々な plugin が提供されています。
