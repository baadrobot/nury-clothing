import {CategoryContainer, CategoryTitle} from './category.styles.jsx';
import {useParams} from 'react-router-dom';
import { useContext, useState, useEffect, Fragment } from 'react';
import { CategoriesContext } from '../../../contexts/categories.context';
import ProductCard from '../../product-card/product-card.component';

const Category = () => {
    const {category} = useParams();
    const {categoriesMap} = useContext(CategoriesContext);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <Fragment>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            <CategoryContainer>
                {/* ставим проверку потому что синхронно ещё не подтянулись данные в БД */}
                {products &&
                    products.map((product) => 
                        <ProductCard key={product.id} product={product}/>
                    )
                }
            </CategoryContainer>
        </Fragment>
    )
}

export default Category; 