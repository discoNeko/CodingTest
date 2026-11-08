# InorderIterative（再帰を使わない中間順走査）

難易度: ★★ / 想定時間: 20〜25分 / カテゴリ: [BinaryTree](README.md)

## 問題

二分木の根 `root` が与えられる。中間順（inorder: 左の部分木 → 自分 → 右の部分木）でノードの値を並べた配列を返す。
**再帰を使わずに**実装すること。

## 入出力例

```
        4
       / \
      2   6
     / \   \
    1   3   7
```

| 入力 | 出力 |
|---|---|
| 上図 | `[1, 2, 3, 4, 6, 7]` |
| 空の木 | `[]` |

二分探索木を中間順で走査すると、値が昇順に並ぶ。

## ヒント

1. まず再帰で書いてみる。再帰呼び出しは、内部で何を記録しているか？
2. 再帰の代わりに、自分でスタックを持つ
3. 左へ行けるだけ進みながらスタックに積み、行き止まりになったら取り出して記録し、右へ移る

## 解答方針

再帰版:

```
inorder(node):
    if node == null: return
    inorder(node.left)
    記録(node.value)
    inorder(node.right)
```

反復版では、再帰の「左の部分木を処理し終わったら自分に戻ってくる」部分をスタックで再現する。

1. 現在のノードから左の子をたどり、通ったノードをすべてスタックに積む
2. スタックから1つ取り出して記録する（左の部分木は処理済み）
3. 取り出したノードの右の子に移り、1 に戻る

時間 O(n)、スタックの大きさは木の高さ h までなので空間 O(h)。

## 参考実装

```js
function inorderIterative(root) {
    const result = []
    const stack = []
    let node = root
    while (node !== null || stack.length > 0) {
        while (node !== null) {
            stack.push(node)
            node = node.left
        }
        node = stack.pop()
        result.push(node.value)
        node = node.right
    }
    return result
}
```

## 深掘り質問

* 前順（preorder）や後順（postorder）ではどう変わりますか？
  * 前順はスタックに積むときに記録すればよい。後順は「右の部分木を処理済みか」の管理が必要で難しい
* 空間 O(1) で中間順に走査できますか？
  * Morris 走査（葉の右ポインタを一時的に書き換える）を使えばできる
* 二分探索木で k 番目に小さい値を求めるには？
  * 中間順に走査して k 番目で止める
