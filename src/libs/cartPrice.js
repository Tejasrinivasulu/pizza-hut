export function calCartProductPrice(product) {
    var _a;
    if (!(product === null || product === void 0 ? void 0 : product.menuItem) || typeof product.menuItem.basePrice !== 'number') {
        return 0;
    }
    let price = product.menuItem.basePrice;
    if (product.selectedSize) {
        price += product.selectedSize.price;
    }
    if (((_a = product.selectedExtras) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        for (const extra of product.selectedExtras) {
            price += extra.price;
        }
    }
    return price;
}
