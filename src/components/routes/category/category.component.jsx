import {useParams} from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';

import ProductCard from '../../product-card/product-card.component';

import { selectCategoriesMap } from '../../../store/categories/category.selector';

import {CategoryContainer, CategoryTitle} from './category.styles.jsx';

const Category = () => {
    const {category} = useParams();
    console.log('render/re-rendering category component');
    const categoriesMap = useSelector(selectCategoriesMap);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        console.log('effect fired calling setProducts');
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