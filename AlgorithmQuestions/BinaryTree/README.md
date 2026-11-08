# BinaryTree

問題で使うノードの定義（言語は問わない）:

```
Node {
    value
    left    // 左の子。なければ null
    right   // 右の子。なければ null
}
```

## 問題一覧

| 問題 | 難易度 | 目標計算量 | 詳細 |
|---|---|---|---|
| 葉（子を持たないノード）の数を数える | ★ | 時間 O(n) | [CountLeaves](CountLeaves.md) |
| 再帰を使わずに中間順（inorder）で走査する | ★★ | 時間 O(n) / 空間 O(h) | [InorderIterative](InorderIterative.md) |
| 二分探索木を実装する（挿入・検索） | ★★ | 平均 O(log n) / 最悪 O(n) | |
| 前順（preorder）で走査する（再帰あり / なし） | ★ / ★★ | 時間 O(n) | |
| 後順（postorder）で走査する（再帰あり / なし） | ★ / ★★★ | 時間 O(n) | |
| 二分探索木の葉をすべて出力する | ★ | 時間 O(n) | |

h は木の高さ。バイナリサーチは [Search](../Search/README.md) に移した。
