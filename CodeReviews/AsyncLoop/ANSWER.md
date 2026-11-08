# AsyncLoop 想定解答

難易度: ★★★ / 想定時間: 20分 / 出題ファイル: [sample1.js](sample1.js)

## Q1. この関数を説明してください

ユーザー ID の配列を受け取り、各ユーザーの情報を API から取得して、ポイントの合計を返す……**つもりの関数**。
`fetchUser` は外部 API の代わりで、100ms 後に `{ id, points: id * 10 }` を返す。

## Q2. この関数に問題のある部分を教えてください

**常に 0 を返す。**

```
await totalPoints([1, 2, 3])  // 0（正しくは 60）
```

`forEach` は渡された関数の戻り値（Promise）を待たない。処理の流れは次のとおり。

1. `forEach` が3つの async 関数を呼ぶ。それぞれ `await fetchUser(id)` で一時停止する
2. `forEach` はすぐに終わり、`return total` で **0 を返す**
3. 100ms 後に各 `fetchUser` が完了し、`total` に加算される。しかし戻り値はもう返したあと

### その他、気づけると加点

* `fetchUser` が失敗（reject）しても、誰もエラーを受け取らない（Unhandled Promise Rejection）
* 存在しない ID のときに `user` が `null` だとどうなるか

## Q3. 問題の部分を解決する処理を追加してください

### 案1: `for...of` で順番に待つ（直列）

```js
async function totalPointsSerial(userIds) {
    let total = 0
    for (const id of userIds) {
        const user = await fetchUser(id)
        total += user.points
    }
    return total
}
```

1件ずつ待つので、3件なら約 300ms かかる。

### 案2: `Promise.all` でまとめて待つ（並列）

```js
async function totalPoints(userIds) {
    const users = await Promise.all(userIds.map(id => fetchUser(id)))
    return users.reduce((sum, user) => sum + user.points, 0)
}
```

すべて同時にリクエストするので、3件でも約 100ms で終わる。

**どちらを選ぶか説明できると加点。** 互いに依存しない取得なら並列が速い。
ただし件数が多いと API に負荷をかけるので、次の Q4 の議論につながる。

## Q4. この関数を汎用的にするための処理を提案してください

* **同時実行数の制限**: 1万件を一度に投げるとレート制限に引っかかる。10件ずつ処理するなど
* **エラー処理**: 1件の失敗で全体を失敗にするか（`Promise.all`）、成功分だけ集計するか（`Promise.allSettled`）
* **タイムアウトとリトライ**: 応答しない API への対策
* **取得と集計の分離**: 「ユーザーを取得する」と「ポイントを合計する」を分けると、テストで API をモックしやすい
* **一括取得 API**: そもそも `fetchUsers([1, 2, 3])` のような API があれば、リクエストは1回で済む

```js
async function mapWithLimit(items, limit, fn) {
    const results = []
    for (let i = 0; i < items.length; i += limit) {
        const chunk = items.slice(i, i + limit)
        results.push(...await Promise.all(chunk.map(fn)))
    }
    return results
}

async function totalPointsLimited(userIds, limit = 10) {
    const users = await mapWithLimit(userIds, limit, fetchUser)
    return users.reduce((sum, user) => sum + user.points, 0)
}
```

## 深掘り質問

* `total += user.points` を複数の処理から同時に実行しても大丈夫ですか？
  * JavaScript はシングルスレッドなので、この1行の途中で割り込まれることはない
  * Java や Go のようにマルチスレッドで動く言語では競合状態になり、ロックやアトミック操作が必要
* `map` や `filter` に async 関数を渡すとどうなりますか？
  * `map` は Promise の配列を返す。`filter` は Promise が常に truthy なので全件残る
* 上の `mapWithLimit` は、10件のうち1件だけ遅いと全体が待たされます。改善するには？
  * 1件終わるごとに次を開始する「ワーカープール」方式にする
