import {useState} from "react";

const Search = ({type = "main", state, attr}) => {
    const [text, setText] = useState("");
    const clearHandler = () => {
        type === "main" ? setText("") : state[1]("");
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
        </>}
    </div>
    // TODO: добавить поисковую выдачу если type === main
}

export default Search;