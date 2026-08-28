'use client';
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
export const CartContext = createContext({});
function isValidCartProduct(product) {
    if (!product || typeof product !== 'object')
        return false;
    const item = product;
    return !!item.menuItem && typeof item.menuItem.basePrice === 'number';
}
function sanitizeCartProducts(products) {
    if (!Array.isArray(products))
        return [];
    return products
        .filter(isValidCartProduct)
        .map((item) => {
        var _a, _b;
        return ({
            menuItem: item.menuItem,
            selectedSize: (_a = item.selectedSize) !== null && _a !== void 0 ? _a : null,
            selectedExtras: (_b = item.selectedExtras) !== null && _b !== void 0 ? _b : [],
        });
    });
}
export { calCartProductPrice } from '@/libs/cartPrice';
export const AppContextProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState([]);
    const ls = typeof window !== 'undefined' ? window.localStorage : null;
    useEffect(() => {
        if (!ls)
            return;
        const stored = ls.getItem('cart');
        if (!stored)
            return;
        try {
            const raw = JSON.parse(stored);
            const parsed = sanitizeCartProducts(raw);
            setCartProducts(parsed);
            if (Array.isArray(raw) && parsed.length !== raw.length) {
                ls.setItem('cart', JSON.stringify(parsed));
            }
        }
        catch (_a) {
            ls.removeItem('cart');
            setCartProducts([]);
        }
    }, [ls]);
    function addToCart(menuItem, selectedSize, selectedExtras) {
        if (!menuItem || typeof menuItem.basePrice !== 'number') {
            toast.error('Could not add item to cart');
            return;
        }
        const cartItem = {
            menuItem,
            selectedSize,
            selectedExtras: selectedExtras !== null && selectedExtras !== void 0 ? selectedExtras : [],
        };
        setCartProducts(prevProducts => {
            const newProducts = [...sanitizeCartProducts(prevProducts), cartItem];
            saveCartProductsToLocalStorage(newProducts);
            return newProducts;
        });
        toast.success('Added to cart');
    }
    function clearCart() {
        setCartProducts([]);
        saveCartProductsToLocalStorage([]);
    }
    function removeCartProduct(indexToRemove) {
        setCartProducts(prevProducts => {
            const newProducts = prevProducts.filter((v, index) => index !== indexToRemove);
            saveCartProductsToLocalStorage(newProducts);
            return newProducts;
        });
        toast.success('Product removed from cart');
    }
    function saveCartProductsToLocalStorage(cartProducts) {
        if (ls) {
            ls.setItem('cart', JSON.stringify(cartProducts));
        }
    }
    return (<SessionProvider>
      <CartContext.Provider value={{ cartProducts, setCartProducts, addToCart, clearCart, removeCartProduct }}>
        {children}
      </CartContext.Provider>
    </SessionProvider>);
};
