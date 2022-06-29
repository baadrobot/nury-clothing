import {CheckoutContainer, CheckoutHeader, Total} from './checkout.styles.jsx';
import { useContext } from 'react';
import { CartContext } from '../../../contexts/cart.context';
import CheckoutItem from '../../checkout-item/checkout-item.component';

const Checkout = () => {
    const {
        cartItems, 
        cartTotal,
    } = useContext(CartContext);

    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <div>
                    <span>Product</span>
                </div>
                <div>
                    <span>Description</span>
                </div>
                <div>
                    <span>Quantity</span>
                </div>
                <div>
                    <span>Price</span>
                </div>
                <div>
                    <span>Remove</span> 
                </div>
            </CheckoutHeader>
            {cartItems.map((cartItem) => ( 
                <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
            ))}
            <Total>Total: ${cartTotal}</Total>
        </CheckoutContainer>
    )
}

export default Checkout;