import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';

import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';
import { selectCartItems } from '../../store/cart/cart.selector';

import {
    CartDropdownComponent, 
    EmptyMessage, 
    CartItems
} from './card-dropdown.styles';


const CardDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    }

    return (
        <CartDropdownComponent>
            <CartItems>
                {cartItems.length ? (
                    cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
                ) : (
                <EmptyMessage>Your cart is empty</EmptyMessage>
                )}                
            </CartItems>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownComponent>
    )
}

export default CardDropdown;