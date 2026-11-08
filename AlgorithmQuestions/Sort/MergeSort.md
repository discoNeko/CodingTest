# MergeSort（マージソート）

難易度: ★★ / 想定時間: 25分 / カテゴリ: [Sort](README.md)

## 問題

整数の配列を昇順に並べた新しい配列を返す関数を、マージソートで実装する。言語の標準ソートは使わない。

## 入出力例

| 入力 | 出力 |
|---|---|
| `[5, 2, 4, 6, 1, 3]` | `[1, 2, 3, 4, 5, 6]` |
| `[]` | `[]` |
| `[3, 3, 1]` | `[1, 3, 3]` |

## ヒント

1. 配列を半分に分け、それぞれを（再帰的に）ソートしたとする。次に何をすればよいか？
2. ソート済みの2つの配列を1つにまとめる（マージする）処理を先に書く
3. 要素数が 0 か 1 の配列は、すでにソート済み

## 解答方針

1. 配列を前半と後半に分ける
2. それぞれを再帰的にマージソートする
3. ソート済みの2つを、先頭から小さい方を取り出しながら1つにまとめる

### 計算量

* 分割の深さは log n 段。各段のマージで合計 n 個の要素を扱うので、時間 **O(n log n)**
* 最悪の場合も O(n log n) で、入力の並びに左右されない
* マージに作業用の配列が必要なので、空間 O(n)

マージで値が等しいときに左側を先に取れば、等しい要素の元の順序が保たれる（安定ソート）。

## 参考実装

```js
function mergeSort(nums) {
    if (nums.length <= 1) return nums.slice()
    const mid = Math.floor(nums.length / 2)
    return merge(mergeSort(nums.slice(0, mid)), mergeSort(nums.slice(mid)))
}

function merge(left, right) {
    const result = []
    let i = 0
    let j = 0
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++])
        } else {
            result.push(right[j++])
        }
    }
    while (i < left.length) result.push(left[i++])
    while (j < right.length) result.push(right[j++])
    return result
}
```

## 深掘り質問

* `left[i] <= right[j]` を `<` にすると何が変わりますか？
  * 等しい要素で右側が先に入り、安定ソートでなくなる
* クイックソートと比べて、どちらをいつ使いますか？
  * 最悪計算量の保証や安定性が必要ならマージソート。メモリを節約したい、平均的に速いのはクイックソート
* メモリに載らない巨大なファイルをソートするには？
  * 分割してそれぞれソートし、ファイルどうしをマージする（外部ソート）
* 連結リストをソートするなら、どのアルゴリズムが向いていますか？
