/**
 * Q1. この関数を説明してください。
 * Q2. この関数に問題のある部分を教えてください。
 * Q3. 問題の部分を解決する処理を追加してください。
 * Q4. この関数を汎用的にするための処理を提案してください。
 */

/**
 * 外部 API の代わり（100ms 後にユーザー情報を返す）
 */
function fetchUser(id) {
    return new Promise(resolve => {
        setTimeout(() => resolve({ id, points: id * 10 }), 100)
    })
}

/**
 * 指定したユーザー全員のポイントの合計を返す
 * 例: await totalPoints([1, 2, 3])
 */
async function totalPoints(userIds) {
    let total = 0
    userIds.forEach(async (id) => {
        const user = await fetchUser(id)
        total += user.points
    })
    return total
}
