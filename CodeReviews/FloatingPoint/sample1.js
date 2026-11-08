/**
 * Q1. この関数を説明してください。
 * Q2. この関数に問題のある部分を教えてください。
 * Q3. 問題の部分を解決する処理を追加してください。
 * Q4. この関数を汎用的にするための処理を提案してください。
 */

const TAX_RATE = 0.1

/**
 * 商品の税込合計金額（円）を返す
 * 例: totalWithTax([{ price: 100, quantity: 1 }])
 */
function totalWithTax(items) {
    let total = 0
    for (const item of items) {
        total += item.price * item.quantity * (1 + TAX_RATE)
    }
    return total
}

/**
 * 予算内で購入できるかを返す
 * 例: canPurchase([{ price: 100, quantity: 1 }], 110)
 */
function canPurchase(items, budget) {
    return totalWithTax(items) <= budget
}
