---
title: 'Tailwindを導入した'
date: '2020-12-21'
---

Tailwind を導入して markdown 部分のデザインを少々変更しました。

## Tailwind CSS の導入

tailwindcss 公式に Next 用の導入方法が書いてありますので順番に実施していきます。  
[Install Tailwind CSS with Next.js](https://tailwindcss.com/docs/guides/nextjs)

特につまりどころはないと思いますが、[purge の設定](https://tailwindcss.com/docs/guides/nextjs#configure-tailwind-to-remove-unused-styles-in-production)はしっかりやっておきましょう。やらないとまあまあのサイズになってしまします。

## @tailwindcss/typography の導入

tailwind の導入ができたので、次はプラグインの導入を行いました。  
`@tailwindcss/typography`は マークダウンのコードのシンタックスハイライトをいい感じのデザインにしてくれるプラグインです。  
もともと`highlight.js`を利用していたのですが、全 import してシンタックスハイライトをすると CSS のサイズがかなり大きく、絞ろうにも言語ごとに import する必要があり面倒でした。  
その点`@tailwindcss/typography`はある程度軽量で、class に記述するだけで良いです。

### 導入手順

以下に書いてある通りコマンドを実行し、`tailwind.config.css`に記述するだけです。  
https://github.com/tailwindlabs/tailwindcss-typography#installation

```sh
yarn add @tailwindcss/typography
```

```js
// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
}
```

`highlight.js`のほうがデザインが好みだったのですが、typography に任せることにしたのでついでにシンタックスハイライターを`Prism.js`にしました。

```sh
yarn add prismjs
```

あとは記事の page component にインストールした諸々を追加していきます。  
Prism.js を適用させるためにハイライトさせたいページで`Prism.highlightAll`を`useEffect`に渡します。

```js
import { FC, useEffect } from 'react'

// ...
useEffect(() => {
  Prism.highlightAll
}, [])
```

あとは typography を効かせたい HTML に対して`prose`などの class を指定するだけです。

```html
<div className="prose sm:prose" dangerouslySetInnerHTML="{{" __html: postData.contentHtml }} />
```

今回の修正によってよりサイズを減らすをへらすことができました。tailwind はプラグインが充実しているのも良いですね。  
それでは。
