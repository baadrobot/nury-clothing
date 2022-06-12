import { createContext, useState, useEffect } from "react";

// cart adding function that is also decides if it should add new items to cart
// or if there already that kind of item just add a quantity of it
const addCartItem = (cartItems, productToAdd) => {
    // find if carItems contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    )

    // if above is found then increment the quantity and return the function
    if(existingCartItem) {
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        )
    }

    // if none of above matched then it means the function valled 1st time
    //  then return new array with modified cartItems/ new cart item and add quantity 1
    return [...cartItems, {...productToAdd, quantity: 1}];
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
})

export const СartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    // cart counter
    const [cartCount, setCartCount] = useState(0);
    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems])

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount};

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}