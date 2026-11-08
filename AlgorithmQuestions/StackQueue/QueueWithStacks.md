# QueueWithStacks（2つのスタックでキュー）

難易度: ★★ / 想定時間: 20分 / カテゴリ: [StackQueue](README.md)

## 問題

スタックの操作（末尾への push、末尾からの pop、空かの判定）だけを使って、キューを実装する。

| 操作 | 内容 |
|---|---|
| `enqueue(x)` | 末尾に x を追加する |
| `dequeue()` | 先頭の要素を取り出して返す。空なら `undefined` |
| `peek()` | 先頭の要素を取り出さずに返す。空なら `undefined` |
| `size()` | 要素数を返す |

## 入出力例

```
enqueue(1), enqueue(2), enqueue(3)
dequeue()  // 1
enqueue(4)
dequeue()  // 2
peek()     // 3
size()     // 2
```

## ヒント

1. スタックの中身を別のスタックに移し替えると、順序はどうなるか？
2. 追加用のスタックと、取り出し用のスタックに役割を分ける
3. 取り出し用が空になったときだけ移し替えればよい

## 解答方針

* `inbox`: `enqueue` された要素を積む
* `outbox`: `dequeue` / `peek` で取り出す
* `outbox` が空のときだけ、`inbox` の全要素を `outbox` に移す。移すと順序が逆になり、最も古い要素が一番上に来る

### 計算量（償却解析）

1回の `dequeue` で n 個を移し替えることがあるので、最悪は O(n)。
しかし各要素は「`inbox` に積む」「`outbox` に移す」「`outbox` から取り出す」をそれぞれ1回しか経験しない。
n 回の操作全体で O(n) なので、**1操作あたり償却 O(1)**。

## 参考実装

```js
class QueueWithStacks {
    constructor() {
        this.inbox = []
        this.outbox = []
    }

    enqueue(x) {
        this.inbox.push(x)
    }

    dequeue() {
        this.shift()
        return this.outbox.pop()
    }

    peek() {
        this.shift()
        return this.outbox[this.outbox.length - 1]
    }

    size() {
        return this.inbox.length + this.outbox.length
    }

    shift() {
        if (this.outbox.length === 0) {
            while (this.inbox.length > 0) {
                this.outbox.push(this.inbox.pop())
            }
        }
    }
}
```

## 深掘り質問

* 毎回 `inbox` から `outbox` に全部移して、終わったら戻す実装と比べて何が違いますか？
  * 毎回移すと1操作 O(n) になる
* 償却 O(1) と最悪 O(1) の違いは何ですか？ 最悪の遅延が問題になるのはどんなシステムですか？
* 逆に、2つのキューでスタックを実装するには？
