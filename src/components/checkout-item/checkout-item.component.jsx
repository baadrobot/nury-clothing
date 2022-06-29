import {
    CheckoutItemContainer, 
    ImageContainer, 
    BaseSpan,
    ItemPrice,
    ItemQuantity,
    QuantityValue,
    Arrow,
    RemoveButton,
} from './checkout-item.styles.jsx';
import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';

const CheckoutItem = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;
    const {
        cartItems, 
        addItemToCart, 
        removeItemFromCart, 
        clearItemFromCart
    } = useContext(CartContext);

    const clearItemHandler = () => clearItemFromCart(cartItem);
    const addItemHanlder = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemFromCart(cartItem);

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
    )
}

export default CheckoutItem;