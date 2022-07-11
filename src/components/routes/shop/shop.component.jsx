import { useEffect } from 'react';
import {Routes, Route} from 'react-router-dom'
import { useDispatch } from 'react-redux';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { getCategoriesAndDocuments } from '../../../utils/firebase/firebase.utils';
import { setCategories } from '../../../store/categories/category.action';

// import './shop.styles.scss';

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoriesArray = await getCategoriesAndDocuments('categories');
            dispatch(setCategories(categoriesArray));
        }

        getCategoriesMap();
        // зависимость dispatch тут чисто формально, 
        // по факту я знаю что dispatch запуститься только 1 раз при запуске приложения
    }, [dispatch]);

    return (
        <Routes>
            <Route index element={<CategoriesPreview/>} />
            <Route path=':category' element={<Category/>} />
        </Routes>
    )
}

export default Shop;