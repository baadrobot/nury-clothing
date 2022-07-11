import {CheckoutContainer, CheckoutHeader, Total} from './checkout.styles.jsx';

import {useSelector} from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../../store/cart/cart.selector.js';

import CheckoutItem from '../../checkout-item/checkout-item.component';

const Checkout = () => {
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

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