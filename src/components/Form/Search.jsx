import {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";

import MainCtx from "../../context/main";
import UtilsCtx from "../../context/utils";

const Search = ({type = "main", state, attr}) => {
    const [text, setText] = useState("");
    const [fText, setFText] = useState([]);
    const [fTags, setFTags] = useState([]);
    const [fAuthors, setFAuthors] = useState([]);

    const navigate = useNavigate();
    const {products} = useContext(MainCtx)
    const {filterPro, sortPro, getUniqueTags, getUniqueAuthors} = useContext(UtilsCtx);

    const clearHandler = () => {
        type === "main" ? setText("") : state[1]("");
    }

    const searchHandler = (e) => {
        const val = e.target.value;
        setText(val);
        if (val.length && val[0] === "#") {
            setFTags(getUniqueTags(products).filter(el => {
                const reg = new RegExp(val.slice(1), "i");
                return reg.test(el);
            }).sort())
            setFText([])
            setFAuthors([])
        }
        if (val.length && val[0] !== "#") {
            setFText(sortPro(filterPro(products).byText(val).data).byTitle().data)
            setFTags(getUniqueTags(products).filter(el => {
                const reg = new RegExp(val, "i");
                return reg.test(el);
            }).sort())
            setFAuthors(getUniqueAuthors(products).filter(el => {
                const reg = new RegExp(val, "i");
                return reg.test(el.name);
            }).sort((a, b) => a.name > b.name ? 1 : -1))
        }
        if (val.length === 0) {
            setFText([])
            setFTags([])
            setFAuthors([])
        }
    }

    return <div className="form__row form__row_search">
        {type === "single" && <>
            <input
                type="text"
                className="form__inp"
                value={state[0]}
                onChange={(e) => state[1](e.target.value)}
                {...attr}
            />
            {!state[0] && <button className="form__icon">
                <i className="lni lni-search-alt"/>
            </button>}
            {state[0] && <button
                className="form__icon"
                onClick={clearHandler}
            >
                <i className="lni lni-close"/>
            </button>}
        </>}
        {type === "main" && <>
            <input
                type="text"
                className="form__inp"
                value={text}
                onChange={searchHandler}
                {...attr}
            />
            {!text && <button className="form__icon">
                <i className="lni lni-search-alt"/>
            </button>}
            {text && <button
                className="form__icon"
                onClick={clearHandler}
            >
                <i className="lni lni-close"/>
            </button>}
            {text && <div className="search__panel">
                {!fText.length && !fTags.length && !fAuthors.length && <span>
                    По запросу <b>{text}</b> ничего не найдено
                </span>}
                {fText.length > 0 && <div className="search__block search__block_text">
                    <h4 className="search__caption">Похожие товары</h4>
                    {fText.slice(0, 4).map(el => <div
                        key={el._id}
                        className="search__row"
                        onClick={() => {
                            navigate(`/product/${el._id}`);
                            clearHandler()
                        }}
                    >
                        {el.name}
                    </div>)}
                </div>}
                {fAuthors.length > 0 && <div className="search__block">
                    <h4 className="search__caption">Поставщики</h4>
                    {fAuthors.slice(0, 4).map(el => <div
                        key={el._id}
                        className="search__row"
                        onClick={() => {
                            navigate(`/provider/${el._id}`);
                            clearHandler()
                        }}
                    >
                        {el.name}
                    </div>)}
                </div>}
                {fTags.length > 0 && <div className={`search__block ${text[0] === "#" ? "search__block_text" : ""}`}>
                    {text[0] !== "#" && <h4 className="search__caption">Теги</h4>}
                    {fTags.slice(0, 4).map(el => <div
                        key={el}
                        className="search__row"
                        onClick={() => {
                            navigate(`/products/category/${el}`);
                            clearHandler()
                        }}
                    >
                        {el}
                    </div>)}
                </div>}
            </div>}
        </>}
    </div>
}

export default Search;