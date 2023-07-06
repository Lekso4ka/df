import React, {useState, useContext, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import "./index.css";
import UtilsCtx from "../../context/utils";
import MainCtx from "../../context/main";

// TODO: показать все теги ?
const Card = ({
    _id,
    name,
    price,
    discount,
    pictures,
    tags,
    likes,
    reviews,
    available,
    stock
}) => {
    const {setPrice, setCntWord} = useContext(UtilsCtx)
    const {api, setProducts, setBasket, basket, userId} = useContext(MainCtx)
    const [isLike, setIsLike] = useState(likes.includes(userId))
    const [inBasket, setInBasket] = useState(basket.filter(el => el._id === _id).length > 0);
    const navigate = useNavigate();
    const tag = tags[tags.length - 1]
    const imgStyle = {
        backgroundImage: `url(${pictures})`
    }

    const tagHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/products/category/${tag}`);
    }
    const basketHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setInBasket(!inBasket);
        if (!inBasket) {
            setBasket(prev => [...prev, {
                _id,
                name,
                price,
                discount,
                stock,
                pictures,
                cnt: 1
            }])
        } else {
            setBasket(prev => prev.filter(el => el._id !== _id));
        }
    }
    const likeHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLike(!isLike);
        api.setLike(_id, !isLike)
            .then(data => {
                setProducts(prev => prev.map(el => {
                    if (el._id === _id) {
                        return data;
                    }
                    return el;
                }))
            })
    }
    return <Link className={`card ${!available || stock === 0 ? "card_disabled" : ""}`} to={`/product/${_id}`}>
        {tag && <button
            className={`card__btn card__tag card__tag_${tag}`}
            onClick={tagHandler}
        >{tag}</button>}
        {discount > 0 && <span className="card__discount">
            {discount}%
        </span>}
        <span className="card__img" style={imgStyle}></span>
        <span className="card__content">
            <span className="card__title">{name}</span>
            <span className="card__info">
                {reviews.length
                    ? <span className="card__rate">
                        <i className="lni lni-star-fill"/>
                        {(reviews.reduce((acc, el) => acc + el.rating, 0) / reviews.length).toFixed(1)}
                    </span>
                    : <span className="card__rate card__rate_empty">
                        <i className="lni lni-star-fill"/>
                    </span>
                }
                <span className="card__review">
                    {reviews.length > 0
                        ? `${reviews.length} ${setCntWord(reviews.length)}`
                        : "нет отзывов"
                    }
                </span>
            </span>
            <span className="card__info">
                <i className="lni lni-thumbs-up"/>
                {likes.length}
            </span>
            {/* TODO: предусмотреть разделение цифр с пробелами */}
            <span className="card__price">
                {discount > 0
                    ? <>
                        {setPrice({price: price, discount: discount})} ₽
                        <del className="card__price_discount">{price} ₽</del>
                    </>
                    : price + " ₽"
                }
            </span>
            <span className="card__buttons">
                {inBasket
                    ? <button
                        className="card__btn card__btn_basket"
                        onClick={basketHandler}
                    >
                        <i className="lni lni-cart-full"/>
                        В корзине
                    </button>
                    : <button
                        className="card__btn card__btn_basket"
                        onClick={basketHandler}
                    >
                        <i className="lni lni-cart"/>
                        В корзину
                    </button>
                }
                <button
                    className="card__btn"
                    onClick={likeHandler}
                >
                    {isLike
                        ? <i className="lni lni-heart-fill"/>
                        : <i className="lni lni-heart"/>
                    }
                </button>
            </span>
        </span>
    </Link>
}

export default Card;