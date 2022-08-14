import { FC } from 'react';
import {CategoryLink, ProductPreview, CategoryPreviewContainer} from './category-preview.styles';
import ProductCard from '../product-card/product-card.component';
import { CategoryItem } from '../../store/categories/category.types';

type CategoryPreviewProps = {
    title: string;
    products: CategoryItem[];
}

const CategoryPreview: FC<CategoryPreviewProps> = ({title, products}) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                {/* отдельный span чтобы кликать можно было только на титул а не весь h2 блок */}
                <CategoryLink to={title}>
                    {title.toUpperCase()}
                </CategoryLink>
            </h2>
            <ProductPreview>
                {
                    products
                        .filter((_, index) => index < 4)
                        .map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                }
            </ProductPreview>
        </CategoryPreviewContainer>
    );
}

export default CategoryPreview;