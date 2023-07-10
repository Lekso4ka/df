import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import Layout from "../components/Layout";
import Card from "../components/Card";
import Empty from "../components/Empty";

import MainCtx from "../context/main";
import UtilsCtx from "../context/utils";
import {Link} from "../components/Nav";

const Author = () => {
    const {id} = useParams();
    const {products, api} = useContext(MainCtx);
    const {filterPro} = useContext(UtilsCtx);
    const [goods, setGoods] = useState([]);
    const [author, setAuthor] = useState({});


    useEffect(() => {
        setGoods(filterPro(products).byAuthor(id).data)
        api.getUser(id)
            .then(data => {
                console.log(data);
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
            <Layout title="Товары пользователя" mb={2} dt={4}>
                {goods.length > 0 && goods.map(el => <Card key={el._id} {...el}/>)}
            </Layout>
        </> : <Empty type="load"/>}
    </>
}
export default Author;