/**
 * Q1. この関数を説明してください。
 * Q2. この関数に問題のある部分を教えてください。
 * Q3. 問題の部分を解決する処理を追加してください。
 * Q4. この関数を汎用的にするための処理を提案してください。
 */

/**
 * 2つのイベントの両方に参加したユーザーの ID を返す（重複なし）
 * 例: commonParticipants([1, 2, 3, 2], [2, 3, 4])
 */
function commonParticipants(eventA, eventB) {
    const result = []
    for (const id of eventA) {
        if (eventB.includes(id) && !result.includes(id)) {
            result.push(id)
        }
    }
    return result
}
