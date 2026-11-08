/**
 * Q1. この関数を説明してください。
 * Q2. この関数に問題のある部分を教えてください。
 * Q3. 問題の部分を解決する処理を追加してください。
 * Q4. この関数を汎用的にするための処理を提案してください。
 */

/**
 * 得点の上位 n 件を返す
 * 例: topScores([80, 100, 95, 9, 72], 3)
 */
function topScores(scores, n) {
    const sorted = scores.sort().reverse()
    return sorted.slice(0, n)
}
