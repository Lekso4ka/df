import {useState, useEffect} from "react";

const Search = ({type = "main", setState, attr}) => {
    const [text, setText] = useState("");
    const clearHandler = () => {
        setText("");
    }
    useEffect(() => {
        if (setState) {
            console.log("aaa")
            setState(text);
        }
    }, [text])

    return <div className="form__row form__row_search">
        <input
            type="text"
            className="form__inp"
            value={text}
            onChange={(e) => setText(e.target.value)}
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
    </div>
    // TODO: добавить поисковую выдачу если type === main
}

export default Search;