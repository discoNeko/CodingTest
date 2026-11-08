# NumberToBoolean 想定解答

難易度: ★ / 想定時間: 15分 / 出題ファイル: [sample1.js](sample1.js)

## Q1. この関数を説明してください

配列のうち「直前の要素より大きい要素」の合計を返す。先頭の要素は比較対象がないので常に含める。

```
total([1, 3, 2, 5])  // 1 + 3 + 5 = 9
```

* 1つ目のループで条件に合う要素を `array` に集める
* 2つ目のループで `array` を合計する

## Q2. この関数に問題のある部分を教えてください

**`!prev` が `prev === 0` のときも true になる。**

`prev` が `null`（まだ前の要素がない）かを判定したいのに、`!prev` は `0` も falsy として扱う。
そのため、**0 の直後の要素は大小に関係なく必ず加算される**。

```
total([5, 0, -3])  // 2 を返す（正しくは 5）
total([0, -1])     // -1 を返す（正しくは 0）
```

`[5, 0, -3]` の流れ:

| n | prev | `!prev \|\| n > prev` | 加算 |
|---|---|---|---|
| 5 | null | true（`!null`） | 5 |
| 0 | 5 | false | - |
| -3 | 0 | **true（`!0`）** | -3 |

### 気づけると加点

* `nums` が `null` / `undefined` だと TypeError になる
* 文字列が混ざると辞書順で比較される（`"10" > "9"` は false）
* `NaN` は `NaN > x` も `x > NaN` も false なので、`NaN` の直後の要素は常に加算されない
* 中間配列 `array` は不要で、1つのループで書ける

## Q3. 問題の部分を解決する処理を追加してください

「前の要素がない」ことを、値ではなく `null` との厳密比較（またはインデックス）で判定する。

```js
function total(nums) {
    let sum = 0
    let prev = null

    for (const n of nums) {
        if (prev === null || n > prev) {
            sum += n
        }
        prev = n
    }
    return sum
}
```

インデックスで判定する書き方でもよい。

```js
if (i === 0 || nums[i] > nums[i - 1])
```

## Q4. この関数を汎用的にするための処理を提案してください

正解は1つではない。受験者の提案に対して「何が嬉しいか / 何が困るか」を聞き返す。

* **関数名**: `total` では何の合計かわからない。`sumOfRisingValues` など
* **条件の引数化**: 「直前より大きい」を関数で受け取れば、「直前より小さい」「直前と異なる」にも使える
* **入力の検証**: 数値以外や空配列をどう扱うか（例外を投げる / 無視する）を決める
* **集計方法の分離**: 抽出（filter）と集計（sum）を分けると、平均や件数にも使える

```js
function sumWhere(nums, shouldInclude) {
    let sum = 0
    for (let i = 0; i < nums.length; i++) {
        if (shouldInclude(nums[i], i === 0 ? null : nums[i - 1])) {
            sum += nums[i]
        }
    }
    return sum
}

const sumOfRisingValues = nums =>
    sumWhere(nums, (n, prev) => prev === null || n > prev)
```

## 深掘り質問

* 「0 を falsy として扱う」問題は、他にどんな場面で起きますか？
  * 例: `const count = input || 10` で、0 を入力しても 10 になる → `??`（Null 合体演算子）を使う
* 他の言語ではどうなりますか？
  * Python の `if not prev` は同じ問題が起きる。Ruby は 0 が truthy なので起きない
* このバグを見つけるテストケースを3つ挙げてください
