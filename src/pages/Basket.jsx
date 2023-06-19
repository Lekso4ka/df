import Layout from "../components/Layout";
import {useState} from "react";
import Empty from "../components/Empty";

export function Basket () {
    const [basket, setBasket] = useState([])
    return <>
        {basket.length > 0 ? <Layout>
            <h1>Корзина</h1>
        </Layout> : <Empty type="basket"/> }
    </>
}