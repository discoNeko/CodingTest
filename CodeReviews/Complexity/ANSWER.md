# Complexity 想定解答

難易度: ★★ / 想定時間: 15〜20分 / 出題ファイル: [sample1.js](sample1.js)

## Q1. この関数を説明してください

2つの ID の配列から、両方に含まれる ID を重複なしで返す。順序は `eventA` に最初に出てきた順。

```
commonParticipants([1, 2, 3, 2], [2, 3, 4])  // [2, 3]
```

## Q2. この関数に問題のある部分を教えてください

**結果は正しいが、件数が増えると極端に遅くなる。**

`includes` は配列を先頭から順に探すので、1回あたり最悪で配列の長さ分の比較が必要になる。
それを `eventA` の要素ごとに2回（`eventB` と `result` に対して）呼んでいる。

* `eventA` の長さを n、`eventB` の長さを m、結果の長さを k とすると、計算量は **O(n × (m + k))**
* n = m = 10万件なら、最悪で約100億回の比較

手元での計測例（Node.js）:

| 件数（各配列） | このコード | Set を使った版 |
|---|---|---|
| 1万件 | 約 25ms | 約 2ms |
| 5万件 | 約 540ms | 約 9ms |

件数が5倍になると、時間は約20倍（≒ 5²）になっている。

テストデータが少ない開発中は問題に気づかず、本番データで初めて遅くなるタイプのバグ。

## Q3. 問題の部分を解決する処理を追加してください

**`Set` を使って、存在チェックを O(1) にする。**

```js
function commonParticipants(eventA, eventB) {
    const inB = new Set(eventB)
    const result = new Set()
    for (const id of eventA) {
        if (inB.has(id)) {
            result.add(id)
        }
    }
    return [...result]
}
```

* 計算量は **O(n + m)**
* 追加のメモリは O(m + k)。速度のためにメモリを使うトレードオフ
* `Set` は追加順を保つので、結果の順序も元のコードと同じ

## Q4. この関数を汎用的にするための処理を提案してください

* **3つ以上のイベントに対応**: 引数を配列の配列にし、順に共通部分をとる
* **ID 以外のキーで比較**: ユーザーオブジェクトの配列を受け取り、キーを取り出す関数を引数にする
* **ソート済みの入力**: 両方がソート済みなら、2つのポインタを進める方法で追加メモリ O(1) にできる
* **データベースで処理**: データが DB にあるなら、アプリに全件取得せず `JOIN` や `INTERSECT` で求める

```js
function intersectAll(lists, getKey = x => x) {
    if (lists.length === 0) return []
    let common = new Set(lists[0].map(getKey))
    for (const list of lists.slice(1)) {
        const keys = new Set(list.map(getKey))
        common = new Set([...common].filter(key => keys.has(key)))
    }
    return [...common]
}
```

## 深掘り質問

* `Set` の `has` はなぜ速いのですか？
  * 内部でハッシュテーブルを使っているため。平均 O(1)、ハッシュが衝突すると悪化する
* 片方が 10件、もう片方が 1億件のとき、どちらを `Set` にしますか？
  * 小さい方を `Set` にすればメモリを節約できる。大きい方は1回なめるだけ
* データが大きすぎて1台のメモリに載らない場合は？
  * 両方をソートしてマージする、ID のハッシュで分割して複数台で処理する、など
