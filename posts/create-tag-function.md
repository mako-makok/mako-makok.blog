---
title: 'タグ機能を追加した'
date: '2021-01-25'
tags: ['Next', 'blog']
---

弊ブログにタグ機能を追加しました。タグをクリックするとそのタグがついている記事を絞り込むことができます。この機能を実装するにあたり、処理がイケてない箇所があったのでついでに直しました。

## 何がイケてないのか
記事が多くなれば多くなるほどビルド時のパフォーマンスが悪くなるような処理になっていました。もちろん記事が多くなればビルドタイムは増加してしまいますが、コード的にも気持ち悪いので直してしまいました。

[このコミット](https://github.com/mako-makok/mako-makok.dev/commit/c89623e01dfcadc9183e9f25df291498347af5c1)がタグ機能追加の機能です。

Next.jsのSSG機能を利用する場合、pages配下のコンポーネントに`getStaticProps`、動的にページを生成する場合はパス取得のための`getStaticPaths`を利用すると思います。  
このブログで言うと、タグで絞り込んだ記事一覧ページ(/tags/{tagname})や、記事詳細ページ(/posts/{id}などで利用しています。  
例えばタグページ(`[tag].tsx`)だと、`getStaticPaths`で`fs`でmarkdownを読みに行ってパスを生成し、タグで絞り込んだ記事一覧を取得するためにmarkdownを全件読みに行って特定のタグついているやつだけ抜き出して･･･となっていました。また当たり前ですが、タグの数だけ`[tag].tsx`が呼ばれるので、明らかに無駄です。


## どうやって解決したか
npm scriptでビルド前にmarkdownをjson形式で吐き出して、タグページでは吐き出したjsonを参照するだけにしました。  
npm scriptでは以下のような`tagmap.json`が吐き出されます。
```json
{
    "tagname1": {
        "id": "foo",
        "title": "foo", 
        "date": "2021-01-01..."    
    },
    "tagname2": {
        "id": "bar",
        "title": "bar", 
        "date": "2021-01-02..."
}
```
タグページでは`tagmap.json`を参照し、最低限のオブジェクト操作で生成します。
```ts
interface Props {
    postSummary: {
        id: string
        title: string
        date: string
        tags: string[]
    }[]
  tag: string
}
type Tag = keyof typeof tagmap

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(tagmap).map((tag) => `/tags/${tag}`)
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (props) => {
  const tag = (props.params as any).tag as Tag
  return {
    props: {
      postSummary: tagmap[tag],
      tag,
    },
  }
}
```

ちなみに`TypeScript`では`compilerOption`で以下のように指定しておくと、jsonファイルを直importして型付けまでやってくれます。アンビエント宣言で型を書く必要はありません。
```json
"compilerOptions": {
    "moduleResolution": "node",
    "resolveJsonModule": true,
}
```

## 改善したいこと
前よりはコードはスッキリしたのですが、型がイケてないです。例えば、`tagmap.json`を直接インポートしてくるとキーの型が`[key: string]: string`とならず、`'tailwind' | 'next'`のようなUnion Typeになってしまいます。`getStaticProps`で`props.params.tag`のように取るとこれはstringなので、ブラケット記法でエラーになってしまいます。もう少し良い書き方を模索します。