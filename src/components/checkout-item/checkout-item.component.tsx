import { FC, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/cart/cart.action';

import {
    CheckoutItemContainer, 
    ImageContainer, 
    BaseSpan,
    ItemPrice,
    ItemQuantity,
    QuantityValue,
    Arrow,
    RemoveButton,
} from './checkout-item.styles';

import { CartItem } from '../../store/cart/cart.types';

type CheckoutItemProps = {
    cartItem: CartItem;
}

const CheckoutItem: FC<CheckoutItemProps> = memo(({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();

    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));
    const addItemHanlder = () => dispatch(addItemToCart(cartItems, cartItem));
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={name}/>
            </ImageContainer>
            <BaseSpan>{name}</BaseSpan>
            <ItemQuantity>
                <Arrow onClick={removeItemHandler}>
                    &#10094;
                </Arrow>
                <QuantityValue>
                    {quantity}
                </QuantityValue>
                <Arrow onClick={addItemHanlder}>
                    &#10095;
                </Arrow>
            </ItemQuantity>
            <ItemPrice className='price'>{price}</ItemPrice>
            {/* эта кнопка должна удалять всю позицию */}
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    );
});

export default CheckoutItem;