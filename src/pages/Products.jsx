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
import Empty from "../components/Empty";
import Sort from "../components/Sort";

export function Products ({
    isCat = false
}) {
    const { name } = useParams()
    const {products} = useContext(MainCtx);
    const {filterPro, sortPro} = useContext(UtilsCtx);
    const [goods, setGoods] = useState([]);
    const [filterGoods, setFilterGoods] = useState([]);
    const [sortGoods, setSortGoods] = useState([]);

    const names = {
        "outerwear": "Одежда",
        "toys": "Игрушки",
        "delicious": "Лакомства",
        "other": "Прочие товары",
    }
    const paginate = usePaginate(sortGoods, 9);
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
        setSortGoods([...sortPro(filterGoods).byDate().data])
    }, [filterGoods])
    return <>
        {goods.length > 0 && <>
            {isCat && <Banner title={names[name] || name} main={false} bg="paws" pattern={true}/>}
            <Layout mb={3} dt={4} fullHeight={true}>
                <Layout>
                    <Filters
                        goods={goods}
                        filterGoods={filterGoods}
                        setFilterGoods={setFilterGoods}
                    />
                </Layout>
                <div style={{gridColumnEnd: "span 3", display: "grid", gap: "2rem", alignContent: filterGoods.length > 0 ? "flex-start" : "stretch"}}>
                    <Sort setState={setSortGoods} filterGoods={filterGoods}/>
                    {sortGoods.length > 0 ? <>
                        <Layout mb={1} dt={3}>
                            {paginate.getPage().map(el => <Card key={el._id} {...el}/>)}
                        </Layout>
                        <Pagination hook={paginate}/>
                    </> :<Empty type="filter"/>}
                </div>
            </Layout>
        </>}
        {goods.length === 0 && <Empty type="category"/>}
</>
}