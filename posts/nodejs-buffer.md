最近ブログの記事一覧ページのデザインを変更したのですが、その際に記事の最初の部分を抜き出して表示するようにしました。  
Google検索で言うところの`meta_description`的なやつです。
これを実装するにあたり、文字列の長さをバイト単位で計算する必要がありました。
インターネットには文字列を`escape`や`encodeURIComponent`して不要な文字列を`replace`することでバイト数を計算するサンプルが多くありました。が、さすがに今どきもう少しいいやり方あるだろうと調べてみました。

## Blob
ちゃんと探したらありました、Blobオブジェクト。  
https://developer.mozilla.org/ja/docs/Web/API/Blob  

Blob以外のオブジェクトからBlobを得るためにはコンストラクタを利用します。このコンストラクタは配列を要求します。
```js
const foo = new Blob(['foo'])
```

BlobはW3CのFile APIで定義されています。
https://www.w3.org/TR/FileAPI/#url

上記で定義されている通り、Blobオブジェクトのプロパティは`size`と`type`があります。
`size`はバイトサイズ、`type`はMIME-Typeです。

かなり直感的にバイトサイズを得ることができます。
```js
const byteLength = new Blob(['foo']).size
```

Blob.sizeは`encodeURIComponent`を使うよりかは全然直感的ですが、Blobはインスタンス生成コストがあるため短い文字列の変換だとパフォーマンスで負けそうです。暇があったらどこかで分岐点を調査します。


## Buffer
Node.js限定ですが、Bufferクラスがあります。
https://nodejs.org/api/buffer.html#buffer_class_buffer

Bufferを得るためには`Buffer.alloc`を使用します。コンストラクタを利用する方法も昔はあったようですが、非推奨になったようです。
```js
// Buffer.alloc(size, fill, encoding)
const buf = Buffer.alloc(11, 'foobar', 'base64');
```

Bufferクラスにはいくつかstaticメソッドが用意されており、その中の1つに`Buffer.byteLength`があります。
これを利用すれば一発でバイトの長さを得ることができ、Blob.sizeより更に直感的です。
冒頭の機能を実装はこちらで行いました。
```js
const byte = Buffer.byteLength('foobar', 'utf8')
```

## おわりに
JavaScriptは1つのことをやるにしても色々やり方があったり古い記事間違っていそうな記事が多くあリますが、
脳死コピペするのではなく都度ベストな方法を模索していきたいです。