import {ProductCardContainer, CardFooter, ProductName, ProductPrice} from './product-card.styles.jsx';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component.jsx';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const ProductCard = ({product}) => {
    const {addItemToCart} = useContext(CartContext);
    const addProductToCart = () => addItemToCart(product);

    const { name, price, imageUrl } = product;
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