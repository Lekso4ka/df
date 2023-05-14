import { useParams } from "react-router-dom";

export function Products ({
    isFav = false,
    isCat = false
}) {
    const { name } = useParams()
    return <>
        {isFav && <h1>Любимые товары</h1>}
        {isCat && <h1>Страница категории "{name}"</h1>}
        {!isFav && !isCat && <h1>Страница товаров</h1>}
    </>
}