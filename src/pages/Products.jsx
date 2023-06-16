import {useContext} from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Banner from "../components/Banner";
import Card from "../components/Card";

import MainCtx from "../context/main"
import {Banners} from "../assets/images"

export function Products ({
    isFav = false,
    isCat = false
}) {
    const { name } = useParams()
    const {products} = useContext(MainCtx);
    const names = {
        "outerwear": "Одежда",
        "toys": "Игрушки",
        "delicious": "Лакомства",
        "other": "Прочие товары",
    }
    const goods = products.filter(el => {
        if (name === "other") {
            return !el.tags.includes(cat => cat === "toys" && cat === "delicious" && cat !== "outerwear")
        } else if (name) {
            return el.tags.includes(name);
        } else {
            return el;
        }
    })
    return <>
        {isCat && <Banner title={names[name]} main={false} bg="paws" pattern={true}/>}
        <Layout>
            {isFav && <h1>Любимые товары</h1>}
            {!isFav && !isCat && <h1>Страница товаров</h1>}
            <Layout mb={2} dt={4}>
                {goods.map(el => <Card key={el._id} {...el}/>)}
            </Layout>
        </Layout>
</>
}