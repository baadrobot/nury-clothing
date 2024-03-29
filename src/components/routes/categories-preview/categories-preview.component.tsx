import { Fragment } from "react";
import { useSelector } from "react-redux";
import CategoryPreview from "../../category-preview/category-preview.component";
import { selectCategoriesMap, selectIsLoading } from "../../../store/categories/category.selector";
import Spinner from "../../spinner/spinner.component";

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectIsLoading);

    // Object.keys перебирает объект по ключам|свойствам, 
    // потом перебираем массив внутри ключа используя .map
    return (
        <Fragment>
        {
            isLoading ? <Spinner/> : (
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];
                    return (
                        <CategoryPreview key={title} title={title} products={products} />
                    );
                })
            )
        }
        </Fragment>
    )
}

export default CategoriesPreview;