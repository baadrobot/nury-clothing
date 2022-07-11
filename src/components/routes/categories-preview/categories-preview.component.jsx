import { Fragment } from "react";
import { useSelector } from "react-redux";
import CategoryPreview from "../../category-preview/category-preview.component";
import { selectCategoriesMap } from "../../../store/categories/category.selector";

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);

    return (
        <Fragment>
        {/* Object.keys перебирает объект по ключам|свойствам, 
        потом перебираем массив внутри ключа используя .map */}
            {Object.keys(categoriesMap).map((title) => {
                const products = categoriesMap[title];
                return (
                    <CategoryPreview key={title} title={title} products={products} />
                );
            })}
        </Fragment>
    )
}

export default CategoriesPreview;