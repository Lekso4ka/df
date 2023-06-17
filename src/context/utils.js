import {createContext} from "react";


// Только со скидкой
// Только в наличии
// По цене от-до
// Поиск по названию товара
class GoodsFilter {
    constructor(arr) {
        this.data = arr;
    }
    byTag(tag, includes = true) {
        this.data = this.data.filter(el => includes
            ? el.tags.includes(tag)
            : !el.tags.includes(tag)
        )
        return this;
    }
    byReviews(flag = true) {
        this.data = this.data.filter(el => flag
            ? el.reviews.length > 0
            : el.reviews.length === 0
        )
        return this;
    }
    byAuthor(id, flag = true) {
        this.data = this.data.filter(el => flag
            ? el.author._id === id
            : el.author._id !== id
        )
        return this;
    }
}

export const initialValue = {
    getNumber: (max = 11, min = 0) => {
        return Math.floor(Math.random() * (max - min) + min);
    },
    filterPro: (arr) => new GoodsFilter(arr),
    getUniqueTags : (arr) => arr.reduce((acc, el) => {
        el.tags.forEach(tag => {
            if (!acc.includes(tag)) {
                acc.push(tag);
            }
        })
        return acc;
    }, []),
    getUniqueAuthors : (arr) => arr.reduce((acc, el) => {
        if (!acc.includes(el.author._id)) {
            acc.push(el.author._id)
        }
        return acc;
    }, [])
}

const Utils = createContext(initialValue);
export default Utils;