import {createContext} from "react";

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
}

export const initialValue = {
    getNumber: (max = 11, min = 0) => {
        return Math.floor(Math.random() * (max - min) + min);
    },
    filterPro: (arr) => new GoodsFilter(arr)
}

const Utils = createContext(initialValue);
export default Utils;