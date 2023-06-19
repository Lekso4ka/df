import {useContext, useState, useEffect} from "react";

import MainCtx from "../../context/main";
import UtilsCtx from "../../context/utils";
import {Search, Input, Switch} from "../Form";

import "./index.css";

const Filters = ({
    goods,
    filterGoods,
    setFilterGoods
}) => {
    const {} = useContext(MainCtx);
    const {
        filterPro,
        getUniqueTags,
        getUniqueAuthors,
        setPrice
    } = useContext(UtilsCtx);

    const [authors, setAuthors] = useState([]);
    const [tags, setTags] = useState([]);
    const [max, setMax] = useState(0);
    const [min, setMin] = useState(0);
    const [search, setSearch] = useState("");
    const [fMax, setFMax] = useState(max);
    const [fMin, setFMin] = useState(min);
    const [fTags, setFTags] = useState([]);
    const [fAuthors, setFAuthors] = useState([]);
    const [available, setAvailable] = useState(false);
    const [discount, setDiscount] = useState(false);
    const [reviews, setReviews] = useState(false);
    const [likes, setLikes] = useState(false);

    useEffect(() => {
        if (goods.length) {
            setAuthors(getUniqueAuthors(goods));
            setTags(getUniqueTags(goods));
            setMin(Math.min(...goods.map(el => setPrice(el))))
            setMax(Math.max(...goods.map(el => setPrice(el))))
        }
    }, [goods, filterGoods])

    useEffect(() => {
        if (fMax !== max) {
            setFMax(max);
        }
        if (fMin !== min) {
            setFMin(min);
        }
    }, [max, min])

    useEffect(() => {
        let arr = [...goods];
        if (fTags.length) {
            arr = filterPro(arr).byTag(fTags).data;
        }
        if (fAuthors.length) {
            arr = filterPro(arr).byAuthor(fAuthors).data;
        }
        if (search) {
            arr = filterPro(arr).byText(search).data;
        }
        // if (!fMin) {
        //     setFMin(min)
        // }
        // if (!fMax) {
        //     setFMax(max)
        // }
        if (fMin !== min || fMax !== max) {
            arr = filterPro(arr).byPrice(fMin, fMax).data;
        }
        if (discount) {
            arr = filterPro(arr).withDiscount().data;
        }
        if (reviews) {
            arr = filterPro(arr).withReviews().data;
        }
        if (likes) {
            arr = filterPro(arr).withLikes().data;
        }
        if (available) {
            arr = filterPro(arr).isAvailable().data;
        }
        setFilterGoods(arr);

    }, [
        search,
        fMax,
        fMin,
        fTags,
        fAuthors,
        available,
        discount,
        reviews,
        likes
    ])
    const tagsHandler = (tag) => {
        setFTags(prev => prev.includes(tag)
            ? prev.filter(el => el !== tag)
            : [...prev, tag]
        )
    }
    const authorsHandler = (id) => {
        setFAuthors(prev => prev.includes(id)
            ? prev.filter(el => el !== id)
            : [...prev, id]
        )
    }
    const clearFilters = () => {
        setFTags([]);
        setFAuthors([]);
        setFMin(min);
        setFMax(max);
        setSearch("");
        setAvailable(false);
        setReviews(false);
        setLikes(false);
        setDiscount(false);
    }
    return <div className="filter">
        <Search
            state={[search, setSearch]}
            attr={{
                placeholder: "Поиск по названию"
            }}
            type="single"
        />
        <div className="filter__item">
            <h4>Выбрать цену</h4>
            <div className="filter__price">
                <Input
                    name="min"
                    state={[fMin, setFMin]}
                    attr={{
                        placeholder: "min",
                        type: "number",
                        step: "0.01",
                        min: min,
                        max: max
                    }}
                />
                -
                <Input
                    name="max"
                    state={[fMax, setFMax]}
                    attr={{
                        placeholder: "max",
                        type: "number",
                        step: "0.01",
                        min: min,
                        max: max
                    }}
                />
            </div>
        </div>
        <div className="filter__item">
            <Switch
                label="Товары со скидкой"
                state={[discount, setDiscount]}
                name="discount"
            />
            <Switch
                label="Товары с отзывами"
                state={[reviews, setReviews]}
                name="reviews"
            />
            <Switch
                label="Товары в наличии"
                state={[available, setAvailable]}
                name="available"
            />
            <Switch
                label="C меткой «Нравится»"
                state={[likes, setLikes]}
                name="likes"
            />
        </div>
        {tags.length > 0 && <div className="filter__item">
            <h4>Теги</h4>
            <ul className="filter__content">
                {tags.map(el => <li
                    key={el}
                    className={`filter__line ${fTags.includes(el) ? "filter__line_active" : ""}`}
                    onClick={() => tagsHandler(el)}
                >{el}</li>)}
            </ul>
        </div>}
        {authors.length > 0 && <div className="filter__item">
            <h4>Поставщики</h4>
            <ul className="filter__content">
                {authors.map(el => <li
                    key={el}
                    className={`filter__line ${fAuthors.includes(el) ? "filter__line_active" : ""}`}
                    onClick={() => authorsHandler(el)}
                >{el}</li>)}
            </ul>
        </div>}
        <button onClick={clearFilters} className="form__btn">Сбросить фильтры</button>
    </div>
}

export default Filters;