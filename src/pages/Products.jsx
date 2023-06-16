import {useContext, useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Banner from "../components/Banner";
import Card from "../components/Card";

import MainCtx from "../context/main"
import UtilsCtx from "../context/utils"

export function Products ({
    isFav = false,
    isCat = false
}) {
    const { name } = useParams()
    const {products} = useContext(MainCtx);
    const {filterPro} = useContext(UtilsCtx);
    const [goods, setGoods] = useState([]);
    const names = {
        "outerwear": "Одежда",
        "toys": "Игрушки",
        "delicious": "Лакомства",
        "other": "Прочие товары",
    }
    useEffect(() => {
        if (name === "other") {
            setGoods(filterPro(products)
                .byTag("df")
                .byTag("delicious", false)
                .byTag("toys", false)
                .byTag("outerwear", false)
                .data
            )
        } else if (name) {
            setGoods(filterPro(products)
                .byTag("df")
                .byTag(name)
                .data
            )
        } else {
            setGoods(filterPro(products)
                .byTag("df")
                .data
            )
        }
    }, [name])
    return <>
        {isCat && <Banner title={names[name] || name} main={false} bg="paws" pattern={true}/>}
        <Layout>
            {isFav && <h1>Любимые товары</h1>}
            {!isFav && !isCat && <h1>Страница товаров</h1>}
            <Layout mb={2} dt={4}>
                {goods.map(el => <Card key={el._id} {...el}/>)}
            </Layout>
        </Layout>
</>
}