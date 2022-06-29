import { CartContext } from '../../contexts/cart.context'; 
import { useContext } from 'react';

import {ShoppingIcon, CartIconContainer, ItemCount} from './cart-icon.styles';

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);
    // тоггл функция которая ставит противоположное выражение, 
    // если было true то будет false и наоборот
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    return(
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon'/>
            <ItemCount className='item-count'>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;