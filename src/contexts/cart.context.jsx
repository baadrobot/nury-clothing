import { createContext, useState } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    // указываем что это ф-ия, но не уверен что это делать обязательно
    setIsCartOpen: () => {},
})

export const СartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState('hidden');
    const value = {isCartOpen, setIsCartOpen};

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}