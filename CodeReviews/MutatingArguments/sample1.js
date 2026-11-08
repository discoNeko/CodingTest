/**
 * Q1. この関数を説明してください。
 * Q2. この関数に問題のある部分を教えてください。
 * Q3. 問題の部分を解決する処理を追加してください。
 * Q4. この関数を汎用的にするための処理を提案してください。
 */

const DISCOUNT_RATE = 0.2

/**
 * セール対象の商品を値引きしたカートを返す（元のカートは変更しない）
 * 例:
 *   const cart = [
 *       { name: 'pen', price: 100, onSale: true },
 *       { name: 'notebook', price: 300, onSale: false },
 *   ]
 *   const saleCart = applySale(cart)
 */
function applySale(cart) {
    const saleCart = [...cart]
    for (const item of saleCart) {
        if (item.onSale) {
            item.price = item.price * (1 - DISCOUNT_RATE)
        }
    }
    return saleCart
}
