import { useContext } from "react";
import { ProductsContext } from "../../../contexts/products.context";
import ProductCard from "../../product-card/product-card.component";
import './shop.styles.scss';

const Shop = () => {
    const {products} = useContext(ProductsContext);

    return (
        <div className="products-container">
            {products.map((products) => (
                <ProductCard key={products.id} product={products}></ProductCard>
            ))}
        </div>
    )
}

export default Shop;