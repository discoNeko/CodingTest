/**
 * Q1. この関数を説明してください。
 * Q2. この関数に問題のある部分を教えてください。
 * Q3. 問題の部分を解決する処理を追加してください。
 * Q4. この関数を汎用的にするための処理を提案してください。
 */
function total(nums){
    let sum = 0
    let prev = null
    let array = []

    for (n of nums) {
        if (!prev || n > prev) {
            array.push(n)
        }
        prev = n
    }

    for (n of array) {
        if (n > 0) sum += n
    }
    return sum
}
