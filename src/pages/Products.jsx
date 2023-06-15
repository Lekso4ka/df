import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

export function Products ({
    isFav = false,
    isCat = false
}) {
    const { name } = useParams()
    return <Layout>
        {isFav && <h1>Любимые товары</h1>}
        {isCat && <h1>Страница категории "{name}"</h1>}
        {!isFav && !isCat && <h1>Страница товаров</h1>}
    </Layout>
}