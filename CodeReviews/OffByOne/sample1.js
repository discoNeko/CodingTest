/**
 * Q1. この関数を説明してください。
 * Q2. この関数に問題のある部分を教えてください。
 * Q3. 問題の部分を解決する処理を追加してください。
 * Q4. この関数を汎用的にするための処理を提案してください。
 */
function total(){
    const map = [
        [1, 1, 2, 3],
        [1, 2, 3, 5],
        [2, 3, 5, 8],
        [3, 5, 8, 13],
    ]
    let result = []

    for (let i = 0; i < map.length; i++) {
        result[i] = []
        for (let j = 0; j < map.length; j++) {
            const sum = map[i][j] + map[i][j+1]
            if(sum % 2 === 0){
                result[i][j] = 0
            } else if (sum > 10) {
                result[i][j] = sum % 10
            } else {
                result[i][j] = sum
            }
        }
    }

    return result
}
