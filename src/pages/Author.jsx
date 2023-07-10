import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import Layout from "../components/Layout";
import Card from "../components/Card";
import Empty from "../components/Empty";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";
import {Link} from "../components/Nav";

import MainCtx from "../context/main";
import UtilsCtx from "../context/utils";
import usePaginate from "../hooks/usePaginate";

const Author = () => {
    const {id} = useParams();
    const {products, api, screen} = useContext(MainCtx);
    const {filterPro} = useContext(UtilsCtx);
    const [goods, setGoods] = useState([]);
    const [author, setAuthor] = useState({});
    const paginate = usePaginate(goods, screen > 1064 ? 4 : 2);

    useEffect(() => {
        setGoods(filterPro(products).byAuthor(id).data)
        api.getUser(id)
            .then(data => {
                setAuthor(data);
            })
    }, [id])

    useEffect(() => {
        setGoods(filterPro(products).byAuthor(id).data)
    }, [products])

    return <>
        {author.name ? <>
            <Layout mb={1} dt={2}>
                <table className="user-table">
                    <caption>{author.name}</caption>
                    <tbody>
                        <tr>
                            <th>Информация</th>
                            <td>{author.about}</td>
                        </tr>
                        <tr>
                            <th>Адрес для связи</th>
                            <td>
                                <Link
                                    title={author.email}
                                    path={`mailto:${author.email}`}
                                    as={"a"}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <img src={author.avatar} alt={author.name} style={{width: "100%"}} />
            </Layout>
            {goods.length > 0 && <Layout title="Товары пользователя" mb={2} dt={4}>
                <div style={{gridColumnEnd: screen > 1064 ? "span 4" : "span 2"}}>
                    <Sort
                        setState={setGoods}
                        filterGoods={goods}
                    />
                </div>
                {paginate.getPage().map(el => <Card key={el._id} {...el}/>)}
                {goods.length > (screen > 1064 ? 4 : 2) && <div style={{gridColumnEnd: screen > 1064 ? "span 4" : "span 2"}}>
                    <Pagination hook={paginate}/>
                </div>}
            </Layout>}
        </> : <Empty type="load"/>}
    </>
}
export default Author;