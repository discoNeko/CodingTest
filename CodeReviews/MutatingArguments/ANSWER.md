# MutatingArguments 想定解答

難易度: ★★ / 想定時間: 15〜20分 / 出題ファイル: [sample1.js](sample1.js)

## Q1. この関数を説明してください

カートの商品のうち、セール対象（`onSale: true`）の価格を 20% 引きにしたカートを返す。
コメントには「元のカートは変更しない」とあり、そのために `[...cart]` で配列をコピーしている。

## Q2. この関数に問題のある部分を教えてください

**元のカートの商品も値引きされてしまう。**

`[...cart]` がコピーするのは配列だけで、中の商品オブジェクトは元のカートと同じものを指している（浅いコピー）。
そのため `item.price = ...` は、元のカートの商品も書き換える。

```
const cart = [
    { name: 'pen', price: 100, onSale: true },
    { name: 'notebook', price: 300, onSale: false },
]
const saleCart = applySale(cart)

saleCart[0].price  // 80
cart[0].price      // 80（100 のままのはず）
```

**2回呼ぶと二重に値引きされる。**

```
applySale(cart)
applySale(cart)[0].price  // 64（80 のはず）
```

画面の再描画などで関数が何度も呼ばれると、呼ぶたびに価格が下がっていく。

### 図で説明する場合

```
cart     ──▶ [ ● , ● ]
               │   │
               ▼   ▼
             pen  notebook   ← 同じオブジェクト
               ▲   ▲
               │   │
saleCart ──▶ [ ● , ● ]
```

### その他、気づけると加点

* 価格が小数になりうる（例: 99 円の 20% 引きは 79.2 円）。端数処理が決まっていない
* `DISCOUNT_RATE` がグローバル定数で、商品ごとに割引率を変えられない

## Q3. 問題の部分を解決する処理を追加してください

商品オブジェクトも新しく作る。

```js
function applySale(cart) {
    return cart.map(item =>
        item.onSale
            ? { ...item, price: item.price * (1 - DISCOUNT_RATE) }
            : item
    )
}
```

セール対象外の商品は元のオブジェクトをそのまま返しているが、書き換えないので問題ない。
受け取った側が書き換える可能性まで考えるなら、全商品をコピーする。

ネストが深いデータなら `structuredClone()` で深いコピーを作る方法もある。ただし毎回全体をコピーするとコストがかかる。

## Q4. この関数を汎用的にするための処理を提案してください

* **割引率を引数化**: `applySale(cart, rate)`、または商品ごとに `discountRate` を持たせる
* **価格の計算を分離**: 「1商品の価格を計算する関数」と「カート全体に適用する関数」を分ける
* **端数処理を明示**: 円単位なら `Math.floor` などで丸めるルールを決める
* **不変性を強制**: TypeScript の `readonly` や `Object.freeze()` で、書き換えをコンパイル時・実行時に検出する

```js
function discountedPrice(item, rate) {
    return item.onSale ? Math.floor(item.price * (1 - rate)) : item.price
}

function applySaleWithRate(cart, rate) {
    return cart.map(item => ({ ...item, price: discountedPrice(item, rate) }))
}
```

## 深掘り質問

* `const cart = [...]` と宣言していても、中身を書き換えられるのはなぜですか？
  * `const` は変数の再代入を禁止するだけで、オブジェクトの中身は変更できる
* 他の言語ではどうなりますか？
  * Java や Python でも、オブジェクトのリストを浅くコピーすると同じ問題が起きる
* React などの UI ライブラリで、この書き方をすると何が起きますか？
  * 状態を直接書き換えると変更が検出されず、画面が更新されないことがある
