import {useContext, useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";

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
                .byTag(["outerwear","toys","delicious"], false)
                .isPublished()
                .data
            )
        } else if (name) {
            setGoods(filterPro(products)
                .byTag(name)
                .isPublished()
                .data
            )
        } else {
            setGoods(filterPro(products)
                .isPublished()
                .data
            )
        }
        paginate.step(1);
    }, [name, products])

    useEffect(() => {
        setFilterGoods(goods);
    }, [goods])

    useEffect(() => {
        paginate.step(1);
    }, [filterGoods])
    return <>
        {isCat && <Banner title={names[name] || name} main={false} bg="paws" pattern={true}/>}
        <Layout title={isFav && "Любимые товары"} mb={3} dt={4}>
            <Layout>
                <Filters
                    goods={goods}
                    filterGoods={filterGoods}
                    setFilterGoods={setFilterGoods}
                />
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