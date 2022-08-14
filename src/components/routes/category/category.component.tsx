import {useParams} from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';

import ProductCard from '../../product-card/product-card.component';
import Spinner from '../../spinner/spinner.component';

import { selectCategoriesMap, selectIsLoading } from '../../../store/categories/category.selector';

import {CategoryContainer, CategoryTitle} from './category.styles';

type CategoryRouteParams = {
    category: string;
}

const Category = () => {
    const {category} = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectIsLoading);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <Fragment>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            {isLoading ? (
                <Spinner/>
             ) : ( 
                <CategoryContainer>
                    {/* ставим проверку потому что синхронно ещё не подтянулись данные в БД */}
                    {products &&
                        products.map((product) => (
                            <ProductCard key={product.id} product={product}/>
                    ))}
                </CategoryContainer>
            )}
        </Fragment>
    )
}

export default Category; 