# PairsWithSum（和が target になる組）

難易度: ★★ / 想定時間: 20〜25分 / カテゴリ: [Array](README.md)

## 問題

整数の配列 `nums` と整数 `target` が与えられる。和が `target` になる2要素の組を、値の組としてすべて返す。

* 同じ要素を2回使ってはいけない（`[3]` と `target = 6` なら答えはなし）
* 同じ値の組は1回だけ返す
* 各組は `[小さい方, 大きい方]` の順にする。組どうしの順序は問わない

## 入出力例

| 入力 | 出力 |
|---|---|
| `nums = [1, 5, 7, -1, 5]`, `target = 6` | `[[1, 5], [-1, 7]]` |
| `nums = [3, 3]`, `target = 6` | `[[3, 3]]` |
| `nums = [3]`, `target = 6` | `[]` |

## ヒント

1. すべての組を試すと O(n²)。ある要素 `x` の相手は何か？
2. 相手 `target - x` がすでに出てきたかを速く調べるには？
3. ソートしてよいなら、両端から近づける方法もある

## 解答方針

| 方法 | 時間 | 空間 |
|---|---|---|
| 二重ループで全組を試す | O(n²) | O(1) |
| ソートして、両端から2つのポインタを近づける | O(n log n) | O(1)〜O(n) |
| これまで見た値をハッシュセットに入れ、相手を探す | O(n) | O(n) |

ハッシュを使う方法では、各要素 `x` について `target - x` が「それより前に出てきたか」を調べる。
自分自身と組にしないよう、調べてからセットに追加する。

## 参考実装

```js
function pairsWithSum(nums, target) {
    const seen = new Set()
    const found = new Set()
    const pairs = []

    for (const x of nums) {
        const other = target - x
        if (seen.has(other)) {
            const pair = [Math.min(x, other), Math.max(x, other)]
            const key = pair.join(',')
            if (!found.has(key)) {
                found.add(key)
                pairs.push(pair)
            }
        }
        seen.add(x)
    }
    return pairs
}
```

## 深掘り質問

* 組ではなく、元の配列のインデックスを返すにはどう変えますか？
  * セットの代わりに「値 → インデックス」のマップを使う
* 3つの和が target になる組（3Sum）ならどうしますか？
  * ソートしたうえで1つを固定し、残りを2つのポインタで探す。O(n²)
* 配列が巨大で、メモリに載らない場合は？
