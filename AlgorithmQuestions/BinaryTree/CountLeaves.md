# CountLeaves（葉の数）

難易度: ★ / 想定時間: 15分 / カテゴリ: [BinaryTree](README.md)

## 問題

二分木の根 `root` が与えられる。葉（左右どちらの子も持たないノード）の数を返す。木が空（`root` が `null`）なら 0 を返す。

## 入出力例

```
        1
       / \
      2   3
     / \   \
    4   5   6
```

| 入力 | 出力 |
|---|---|
| 上図 | `3`（4, 5, 6） |
| ノード1つだけの木 | `1` |
| 空の木 | `0` |

## ヒント

1. あるノードを根とする部分木の葉の数は、左右の部分木の葉の数とどう関係するか？
2. 再帰の終了条件は2つある（ノードがない / ノードが葉）
3. 再帰を使わないなら、スタックやキューで全ノードを訪れる

## 解答方針

* ノードが `null` なら 0
* ノードが葉なら 1
* それ以外は「左の部分木の葉の数 + 右の部分木の葉の数」

全ノードを1回ずつ訪れるので時間 O(n)、再帰の深さは木の高さ h なので空間 O(h)。

## 参考実装

```js
function countLeaves(node) {
    if (node === null) return 0
    if (node.left === null && node.right === null) return 1
    return countLeaves(node.left) + countLeaves(node.right)
}

function countLeavesIterative(root) {
    if (root === null) return 0
    let count = 0
    const stack = [root]
    while (stack.length > 0) {
        const node = stack.pop()
        if (node.left === null && node.right === null) count++
        if (node.left !== null) stack.push(node.left)
        if (node.right !== null) stack.push(node.right)
    }
    return count
}
```

## 深掘り質問

* 木が一直線（すべてのノードが右の子だけを持つ）で、ノードが100万個あると何が起きますか？
  * 再帰版はスタックオーバーフローする可能性がある。反復版なら起きない
* 木の高さ（深さ）を求めるには、どう変えますか？
* 葉の値を左から順に出力するには？
  * 左の子を先に処理する。反復版ならスタックに右から積む
