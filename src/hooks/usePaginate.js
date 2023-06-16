import {useState} from "react";

const usePaginate = (arr, cnt) => {
    const [page, setPage] = useState(1);
    const max = Math.ceil(arr.length / cnt);
    const step = (n) => {
        setPage(n);
    }
    const prev = () => {
        setPage(Math.max(1, page - 1));
    }
    const next = () => {
        setPage(Math.min(max, page + 1));
    }
    const start = () => {
        setPage(1);
    }
    const end = () => {
        setPage(max);
    }
    const getPage = () => {
        return arr.slice((page - 1) * cnt, cnt * page);
    }
    return {
        page,
        max,
        step,
        prev,
        next,
        start,
        end,
        getPage
    }
}

export default usePaginate;