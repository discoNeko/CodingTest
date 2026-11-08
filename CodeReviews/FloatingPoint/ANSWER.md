# FloatingPoint 想定解答

難易度: ★★ / 想定時間: 15〜20分 / 出題ファイル: [sample1.js](sample1.js)

## Q1. この関数を説明してください

* `totalWithTax`: 各商品の「単価 × 数量 × 1.1」を足し合わせ、税込の合計金額を返す
* `canPurchase`: 税込合計が予算以下なら `true` を返す

## Q2. この関数に問題のある部分を教えてください

### 1. 浮動小数点の誤差で、予算ぴったりの買い物ができない

```
totalWithTax([{ price: 100, quantity: 1 }])     // 110.00000000000001
canPurchase([{ price: 100, quantity: 1 }], 110)  // false（true のはず）
```

`0.1` は2進数で正確に表せないので、`1 + 0.1` は厳密には 1.1 ではない。
その誤差が掛け算で表に出て、`110.00000000000001 <= 110` が false になる。

### 2. 1円未満の端数が処理されていない

```
totalWithTax([{ price: 198, quantity: 1 }])  // 217.8
```

金額に小数が残る。切り捨て・四捨五入などのルールが決まっていない。

### 3. 商品ごとに税を掛けている（気づけると加点）

税を商品ごとに計算して足すか、合計してから計算するかで、端数処理の結果が変わる。

| 商品 | 商品ごとに切り捨て | 合計してから切り捨て |
|---|---|---|
| 105円 × 1 | 115 | |
| 105円 × 1 | 115 | |
| 合計 | **230円** | 210 × 1.1 = 231 → **231円** |

日本のインボイス制度では「1つの請求書で、税率ごとに1回」端数処理するルールになっている。

## Q3. 問題の部分を解決する処理を追加してください

**金額は整数（円）で計算し、税率もパーセントの整数で持つ。** 端数処理は合計してから1回だけ行う。

```js
const TAX_PERCENT = 10

function totalWithTax(items) {
    let subtotal = 0
    for (const item of items) {
        subtotal += item.price * item.quantity
    }
    const tax = Math.floor(subtotal * TAX_PERCENT / 100)
    return subtotal + tax
}
```

```
totalWithTax([{ price: 100, quantity: 1 }])  // 110
totalWithTax([{ price: 198, quantity: 1 }])  // 217
```

`Math.round(x * 100) / 100` のように表示用に丸めるだけでは、比較の問題は解決しない場合がある。
計算の途中から整数で扱うのが確実。

### 別解

* 比較に許容誤差を入れる（`total - budget < 0.0001`）。応急処置としてはありだが、金額には向かない
* 10進数を正確に扱えるライブラリ（`decimal.js` など）や、言語の Decimal 型（Java の `BigDecimal`、Python の `decimal`）を使う

## Q4. この関数を汎用的にするための処理を提案してください

* **税率を引数化**: 軽減税率（8%）と標準税率（10%）が混在するケースに対応する
* **端数処理の方法を引数化**: 切り捨て / 四捨五入 / 切り上げ
* **戻り値を構造化**: 小計・税額・合計を別々に返すと、レシート表示などに使える
* **外貨への対応**: ドルなど小数のある通貨は、セント単位の整数で持つ

```js
function checkout(items, { taxPercent = 10, round = Math.floor } = {}) {
    let subtotal = 0
    for (const item of items) {
        subtotal += item.price * item.quantity
    }
    const tax = round(subtotal * taxPercent / 100)
    return { subtotal, tax, total: subtotal + tax }
}
```

## 深掘り質問

* なぜ `0.1 + 0.2 === 0.3` は false になるのですか？
  * 10進数の 0.1 は2進数では循環小数になり、有限のビット数では丸められるため
* 浮動小数点数を使ってよいのはどんな場面ですか？
  * 物理シミュレーションやグラフィックスなど、わずかな誤差が許される計算
* 商品ごとに税率が違う場合（軽減税率）、どう計算しますか？
