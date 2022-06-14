import { createContext, useState, useEffect } from "react";

// cart adding function that is also decides if it should add new items to cart
// or if there already that kind of item just add a quantity of it
const addCartItem = (cartItems, productToAdd) => {
    // find if carItems contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    // if above is found then increment the quantity and return the function
    if(existingCartItem) {
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        );
    };

    // if none of above matched then it means the function valled 1st time
    //  then return new array with modified cartItems/ new cart item and add quantity 1
    return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    // check if quantity is equal to 1, if it is remove that item from cart
    if(existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    };

    // return back cart items with matching cart item with reduced quantity
    return cartItems.map((cartItem) => 
        cartItem.id === cartItemToRemove.id
        ? {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
    );
}

const clearCartItem = (cartItems, cartItemToClear) => 
    cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0,
})

export const СartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }
    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }
    const clearItemFromCart = (cartItemToRemove) => {
        setCartItems(clearCartItem(cartItems, cartItemToRemove));
    }

    // cart counter
    const [cartCount, setCartCount] = useState(0);
    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) =>
            total + cartItem.quantity, 
            0
        );
        setCartCount(newCartCount);
    }, [cartItems])

    // total counter
    const [cartTotal, setTotalPrice] = useState(0);
    // сначала нужно перебрать все позиции и там где quantity больше 1 то надо умножить цену на quantity
    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => 
            total + cartItem.price * cartItem.quantity, 
            0
        );
        setTotalPrice(newCartTotal);
    }, [cartItems])

    const value = {
        isCartOpen, 
        setIsCartOpen, 
        cartItems, 
        addItemToCart, 
        removeItemFromCart, 
        clearItemFromCart,
        cartCount,
        cartTotal,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}