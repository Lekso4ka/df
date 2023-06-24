import {useContext, useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";

import Layout from "../components/Layout";
import Empty from "../components/Empty";

import MainCtx from "../context/main";
import UtilsCtx from "../context/utils";
/*


*
* Описание
*
* Отзывы...
* */
export function SingleProduct () {
    const {id} = useParams();
    const {api} = useContext(MainCtx);
    const {setPrice, setRating, setDescription} = useContext(UtilsCtx);
    const [product, setProduct] = useState({});

    useEffect(() => {
        api.getProduct(id)
            .then(data => {
                setProduct(data);
            })
    }, [])
    useEffect(() => {
        console.log(product.stock);
    }, [product])
    return <>
        {product.name ? <Layout title={product.name} dt={2}>
            <div>
                <div>
                    {product.tags.map(el => <button key={el}>{el}</button>)}
                </div>
                <img src={product.pictures} alt={product.name} className="product__img"/>
            </div>
            <div>
                <h3>
                    {product.discount
                        ? <>
                            <span>{setPrice(product)} ₽</span>
                            <del>{product.price} ₽</del>
                            <span>-{product.discount}%</span>
                        </>
                        : <span>{product.price} ₽</span>
                    }
                </h3>
                <div>
                    <span>{setRating(product)}</span>
                    <span>{product.reviews.length} отзывов</span>
                    <span>
                        <i className="lni lni-thumbs-up"/>
                        {product.likes.length}
                    </span>
                    <span>
                        <i className="lni lni-heart"/>
                    </span>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <th>Вес:</th>
                            <td>{product.wight}</td>
                        </tr>
                        <tr>
                            <th>Наличие:</th>
                            <td>
                                {product.stock === 0 && <span>Отсутствует</span>}
                                {product.stock > 0 && product.stock < 5 && <span>Мало</span>}
                                {product.stock >= 5 && product.stock < 10 && <span>Не много</span>}
                                {product.stock >= 10 && <span>Много</span>}
                            </td>
                        </tr>
                        <tr>
                            <th>Поставщик:</th>
                            <td>{product.author.name}</td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button>Купить</button>
                    <button>Перейти в корзину</button>
                    <button>-</button>
                    <span></span>
                    <button>+</button>
                </div>
            </div>
            <div style={{gridColumnEnd: "span 2"}}>
                <h2>Описание</h2>
                {setDescription(product.description).map((el, i) => <p key={i}>{el}</p>)}
            </div>
            <div style={{gridColumnEnd: "span 2"}}>
                <h2>Отзывы</h2>
            </div>
        </Layout> : <Empty type="load"/>}
    </>
}