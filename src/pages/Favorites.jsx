import Layout from "../components/Layout";
import {useState} from "react";
import Empty from "../components/Empty";

export function Favorites () {
    const [favorites, setFavorites] = useState([])
    return <>
        {favorites.length > 0 ? <Layout>
            <h1>Любимые товары</h1>
        </Layout> : <Empty type="favorite"/> }
    </>
}
