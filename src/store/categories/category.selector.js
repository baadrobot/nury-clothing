import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
    [selectCategoryReducer],
    // след операция запустится если мемоизированные данные в скобочках (categoriesSlice) 
    // отличаются от данных в квадратных скобках [selectCategoryReducer]
    (categoriesSlice) => categoriesSlice.categories
)

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) =>
    // перезапускать reduce только если мемоизированный массив (categories) отличается от [selectCategories]
        categories.reduce((acc, category) => {
            const {title, items} = category;
            // т.к. ниже мы инициализировали что acc это объект, мы тут делаем следующее
            // добавляем объекту ключ/свойство с тайтлом текущей итерации от reduce
            // и задаем значение текущих items, формируя т.н. Hashtable 
            // (формат хранения данных, который в некоторых случаях удобней простых массивов) 
            // https://www.kirupa.com/html5/hashtables_vs_arrays.htm
            acc[title.toLowerCase()] = items;
            return acc;
        }, {})
);

    // вот такая структура должна быть
    // {
    //     hats: {
    //         title: 'Hats',
    //         items: [
    //             {},
    //             {}
    //         ]
    //     },
    //     sneakers: {
    //         title: 'sneakers',
    //         items: [
    //             {},
    //             {}
    //         ]
    //     }
    // }
;