import {useContext, useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Pagination from "../components/Pagination";

import MainCtx from "../context/main"
import UtilsCtx from "../context/utils"

import usePaginate from "../hooks/usePaginate";

export function Products ({
    isFav = false,
    isCat = false
}) {
    const { name } = useParams()
    const {products} = useContext(MainCtx);
    const {filterPro, getUniqueTags, getUniqueAuthors} = useContext(UtilsCtx);
    const [goods, setGoods] = useState([]);
    const [filterGoods, setFilterGoods] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [tags, setTags] = useState([]);
    const names = {
        "outerwear": "Одежда",
        "toys": "Игрушки",
        "delicious": "Лакомства",
        "other": "Прочие товары",
    }
    const paginate = usePaginate(filterGoods, 12);
    useEffect(() => {
        if (name === "other") {
            setGoods(filterPro(products)
                .byTag("delicious", false)
                .byTag("toys", false)
                .byTag("outerwear", false)
                .data
            )
        } else if (name) {
            setGoods(filterPro(products)
                .byTag(name)
                .data
            )
        } else {
            setGoods(filterPro(products)
                .data
            )
        }
        paginate.step(1);

    }, [name, products])

    useEffect(() => {
        setAuthors(getUniqueAuthors(goods));
        setTags(getUniqueTags(goods));
        setFilterGoods(goods);
    }, [goods])
    useEffect(() => {
        paginate.step(1);
    }, [filterGoods])
    return <>
        {isCat && <Banner title={names[name] || name} main={false} bg="paws" pattern={true}/>}
        <Layout title={isFav && "Любимые товары"} mb={3} dt={4}>
            <Layout>
                <div className="filter">
                    {tags.length > 0 && <>
                        <h4>Фильтр по тегам</h4>
                        <ul>
                            {tags.map(el => <li
                                key={el}
                                className="filter__item"
                                onClick={() => setFilterGoods(filterPro(goods).byTag(el).data)}
                            >{el}</li>)}
                        </ul>
                    </>}
                    {authors.length > 0 && <>
                        <h4>Фильтр по поставщикам</h4>
                        <ul>
                            {authors.map(el => <li
                                key={el}
                                className="filter__item"
                                onClick={() => setFilterGoods(filterPro(goods).byAuthor(el).data)}
                            >{el}</li>)}
                        </ul>
                    </>}
                </div>
            </Layout>
            <div style={{gridColumnEnd: "span 3", display: "grid", gap: "2rem", alignContent: "flex-start"}}>
                <Layout mb={1} dt={3}>
                    {paginate.getPage().map(el => <Card key={el._id} {...el}/>)}
                </Layout>
                <Pagination hook={paginate}/>
            </div>

        </Layout>
</>
}