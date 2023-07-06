import {useContext, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import UtilsCtx from "../../context/utils";
import MainCtx from "../../context/main";
const Info = (product) => {
    const {setPrice, setRating, setStars, setCntWord} = useContext(UtilsCtx);
    const {userId, api, setProducts, setBasket, basket} = useContext(MainCtx);
    const [isLike, setIsLike] = useState(product.likes.includes(userId));
    const [cnt, setCnt] = useState(basket.filter(el => el._id === product._id)?.[0]?.cnt || 0);
    const navigate = useNavigate();
    const likeHandler = () => {
        setIsLike(!isLike);
        api.setLike(product._id, !isLike)
            .then(data => {
                product.setProduct(data);
                setProducts(prev => prev.map(el => {
                    if (el._id === product._id) {
                        return data;
                    }
                    return el;
                }))
            })
    }

    useEffect(() => {
        if (cnt) {
            if (basket.filter(el => el._id === product._id).length) {
                setBasket(prev => prev.map(el => {
                    if (el._id === product._id) {
                        el.cnt = cnt;
                    }
                    return el;
                }))
            } else {
                setBasket(prev => [...prev, {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    discount: product.discount,
                    stock: product.stock,
                    pictures: product.pictures,
                    cnt: cnt
                }])
            }
        } else {
            setBasket(prev => prev.filter(el => el._id !== product._id));
        }
    }, [cnt])

    return <div className="product__info">
        <h3 className="product__price">
            {product.discount
                ? <>
                    <span>{setPrice(product)} ₽</span>
                    <del className="product__price_del">{product.price} ₽</del>
                    <span className="product__price_per">-{product.discount}%</span>
                </>
                : <span>{product.price} ₽</span>
            }
        </h3>
        <div className="product__rate">
            <span>{setStars(setRating(product))}</span>
            <span>{product.reviews.length} {setCntWord(product.reviews.length, "комментариев", "комментарий", "комментария")}</span>
            <span>
                <i className="lni lni-thumbs-up"/>
                &nbsp;{product.likes.length}
            </span>
            <span
                className="product__heart"
                onClick={likeHandler}
            >
                {isLike
                    ? <i className="lni lni-heart-fill"/>
                    : <i className="lni lni-heart"/>
                }
            </span>
        </div>
        <table className="product__table">
            <tbody>
            <tr>
                <th>Вес:</th>
                <td>{product.wight}</td>
            </tr>
            <tr>
                <th>Наличие:</th>
                <td>
                    {(product.stock === 0 || !product.available) && <span>Отсутствует</span>}
                    {product.available && product.stock > 0 && product.stock < 5 && <span>Мало</span>}
                    {product.available && product.stock >= 5 && product.stock < 10 && <span>Не много</span>}
                    {product.available && product.stock >= 10 && <span>Много</span>}
                </td>
            </tr>
            {/* TODO: Перейти на страницу автора */}
            <tr>
                <th>Поставщик:</th>
                <td>{product.author.name}</td>
            </tr>
            </tbody>
        </table>
        <div className="product__btns">
            {cnt
                ? <>
                    <button
                        className="product__btn"
                        onClick={() => navigate("/basket")}
                    >Перейти в корзину</button>
                    <button
                        className="product__btn product__btn_square"
                        onClick={() => setCnt(cnt - 1)}
                    >-</button>
                    <span className="product__cnt">{cnt}</span>
                    <button
                        className="product__btn product__btn_square"
                        disabled={cnt >= product.stock}
                        onClick={() => setCnt(cnt + 1)}
                    >+</button>
                </>
                : <button
                    disabled={product.stock === 0 || !product.available}
                    className="product__btn"
                    onClick={() => setCnt(cnt + 1)}
                >Купить</button>
            }
        </div>
    </div>
}

export default Info;