import { calCartProductPrice } from '@/libs/cartPrice';
export const DELIVERY_FEE = 40;
export const GST_RATE = 0.05;
export function calcSubtotal(cartProducts) {
    return cartProducts.reduce((sum, item) => sum + calCartProductPrice(item), 0);
}
export function calcTax(subtotal) {
    return Math.round(subtotal * GST_RATE * 100) / 100;
}
export function calcOrderTotal(subtotal) {
    return subtotal + DELIVERY_FEE + calcTax(subtotal);
}
