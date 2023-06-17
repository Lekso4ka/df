import "./index.css"

const Pagination = ({hook}) => {
    return <div className="pagination">
        <button
            disabled={hook.page === 1}
            className="pagination__btn"
            onClick={() => hook.start()}
        >
            <i className="lni lni-angle-double-left"/>
        </button>
        <button
            disabled={hook.page === 1}
            className="pagination__btn"
            onClick={() => hook.prev()}
        >
            <i className="lni lni-chevron-left"/>
        </button>
        {hook.page <= 2 && <>
            <button
                className={`pagination__btn ${hook.page === 1 ? "pagination__btn_active" : ""}`}
                onClick={() => hook.step(1)}
            >1</button>
            {hook.max >= 2 && <button
                className={`pagination__btn ${hook.page === 2 ? "pagination__btn_active" : ""}`}
                onClick={() => hook.step(2)}
            >2</button>}
            {hook.max >= 3 && <button
                className={`pagination__btn ${hook.page === 3 ? "pagination__btn_active" : ""}`}
                onClick={() => hook.step(3)}
            >3</button>}
            {hook.max > 3 && "..."}
        </>}
        {(hook.page > 2 && hook.page <= (hook.max - 2)) && <>
            ...
            <button
                className="pagination__btn"
                onClick={() => hook.step(hook.page - 1)}
            >{hook.page - 1}</button>
            <button
                className="pagination__btn pagination__btn_active"
                onClick={() => hook.step(hook.page)}
            >{hook.page}</button>
            <button
                className="pagination__btn"
                onClick={() => hook.step(hook.page + 1)}
            >{hook.page + 1}</button>
            ...
        </>}
        {hook.page > hook.max - 2 && hook.max - 2 > 1 && <>
            {hook.max - 2 !== 1 && "..."}
            <button
                className={`pagination__btn ${hook.page === hook.max - 2 ? "pagination__btn_active" : ""}`}
                onClick={() => hook.step(hook.max - 2)}
            >{hook.max - 2}</button>
            <button
                className={`pagination__btn ${hook.page === hook.max - 1 ? "pagination__btn_active" : ""}`}
                onClick={() => hook.step(hook.max - 1)}
            >{hook.max - 1}</button>
            <button
                className={`pagination__btn ${hook.page === hook.max ? "pagination__btn_active" : ""}`}
                onClick={() => hook.step(hook.max)}
            >{hook.max}</button>
        </>}
        <button
            disabled={hook.page === hook.max}
            className="pagination__btn"
            onClick={() => hook.next()}
        >
            <i className="lni lni-chevron-right"/>
        </button>
        <button
            disabled={hook.page === hook.max}
            className="pagination__btn"
            onClick={() => hook.end()}
        >
            <i className="lni lni-angle-double-right"/>
        </button>
    </div>
}

export default Pagination;