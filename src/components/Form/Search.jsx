import {useState, useEffect} from "react";

const Search = ({type = "main", state, attr}) => {
    const [text, setText] = useState("");
    const clearHandler = () => {
        setText("");
    }
    useEffect(() => {
        if (state) {
            state[1](text);
        }
    }, [text])
    useEffect(() => {
        if (state?.[0] !== text) {
            setText(state?.[0]);
        }
    }, [state?.[0]])

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