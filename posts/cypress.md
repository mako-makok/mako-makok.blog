---
title: 'Cypress'
date: '2021-10-21'
tags: ['Cypress']
---

Cypress を触る機会があったので、備忘録的にまとめていく。

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

E2E テストをやりたい、となったときによく上がるのが下記。

- Selenium
- Puppeteer
- Test Cafe

### Cypress VS Selenium & Puppeteer

そもそも、Selenium と Puppeteer はテスティングツールではなく、ブラウザ操作自動化ツール。  
Selenium だと Web Driver の管理が必要だったり、両方ともアサーション用のライブラリを自前で用意する必要がある。Cypress には E2E テスト開発を便利にしてくれる多くの機能があるため、E2E テストという観点では Cypress に軍配が上がる。

### Cypress VS Test Cafe

Test Cafe は非常に高機能で、Cypress と比べても遜色はない。というかむしろ Cypress より高機能。下記の機能はもちろんサポートしている。

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

Cypress で実現できない要件がある場合は TestCafe、そうでない場合は Cypress で良いと言うのが私の結論。  
完全に主観だが、Cypress のほうが公式のサポートが手厚く、ドキュメントの整備もされている。GUI の UX(=デバッガビリティ)も良い。  
Cypress は IE を完全に切り捨てているので、ここがポイントになることが多そう。

## Cypress の簡単な使用方法

1. `npm install cypress`
2. `npx cypress open`
3. GUI が開くので、サンプルのテストをクリックすると始まる

この状態では以下のディレクトリ構成になっているはず。

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

設定ファイルです。

### fixtures

json や画像ファイルなど、固定データセットを配置する。  
エンコードの形式などもオプションで選択できる。
詳しくは以下。
https://docs.cypress.io/api/commands/fixture

以下は公式のサンプル。json を読み込むときは import するか、`cy.fixture`にファイルのパスを直接わたして読み込む。

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
