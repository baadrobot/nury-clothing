import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action.js';
import { selectCartItems } from '../../store/cart/cart.selector.js';

import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component.jsx';

import {
    ProductCardContainer, 
    CardFooter, 
    ProductName, 
    ProductPrice
} from './product-card.styles.jsx';

const ProductCard = ({product}) => {
    const { name, price, imageUrl } = product;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

    return ( 
        <ProductCardContainer>
            <img src={imageUrl} alt={`${name}`}/>
            <CardFooter>
                <ProductName>{name}</ProductName>
                <ProductPrice>{price}</ProductPrice>
            </CardFooter>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to cart</Button>
        </ProductCardContainer>
    )
}

export default ProductCard;