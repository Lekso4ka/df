import {useContext, useState, useEffect} from "react";
import UtilsCtx from "../../context/utils";

import "./index.css";
const Sort = ({
    setState,
    filterGoods
}) => {
    const {sortPro} = useContext(UtilsCtx);
    const [sName, setSName] = useState(0);
    const [sPrice, setSPrice] = useState(0);
    const [sDiscount, setSDiscount] = useState(0);
    const [sPopular, setSPopular] = useState(0);
    const [sort, setSort] = useState(sortPro(filterGoods))
    useEffect(() => {
        sort.byDate();
        if (sName) {
            sort.byTitle(sName === 1 ? "up" : "down");
        }
        if (sPopular) {
            sort.byPopular(sPopular === 1 ? "down" : "up", true);
        }
        if (sPrice) {
            sort.byPrice(sPrice === 1 ? "up" : "down");
        }
        if (sDiscount) {
            sort.byDiscount(sDiscount === 1 ? "down" : "up");
        }
        setState([...sort.data]);

    }, [sName, sPrice, sDiscount, sPopular, sort.data])

    useEffect(() => {
        if (filterGoods.length !== sort.data?.length) {
            setSort(sortPro(filterGoods).byDate());
        }
    }, [filterGoods])
    return <>
        <div className="sort">
            <button
                className={`sort__btn ${sName ? "sort__btn_active" : ""}`}
                onClick={() => setSName(sName >= 2 ? 0 : sName + 1)}
            >
                <i className={`lni lni-sort-amount-${sName === 2 ? "d" : "a"}sc`}/>
                <span>по названию</span>
            </button>
            <button
                className={`sort__btn ${sPrice ? "sort__btn_active" : ""}`}
                onClick={() => setSPrice(sPrice >= 2 ? 0 : sPrice + 1)}
            >
                <i className={`lni lni-sort-amount-${sPrice === 2 ? "d" : "a"}sc`}/>
                <span>по цене</span>
            </button>
            <button
                className={`sort__btn ${sDiscount ? "sort__btn_active" : ""}`}
                onClick={() => setSDiscount(sDiscount >= 2 ? 0 : sDiscount + 1)}
            >
                <i className={`lni lni-sort-amount-${sDiscount === 2 ? "a" : "d"}sc`}/>
                <span>по скидке</span>
            </button>
            <button
                className={`sort__btn ${sPopular ? "sort__btn_active" : ""}`}
                onClick={() => setSPopular(sPopular >= 2 ? 0 : sPopular + 1)}
            >
                <i className={`lni lni-sort-amount-${sPopular === 2 ? "a" : "d"}sc`}/>
                <span>по популярности</span>
            </button>
        </div>
    </>
}

export default Sort;