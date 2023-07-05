import {useContext, useState, useEffect} from "react";
import UtilsCtx from "../../context/utils";
import MainCtx from "../../context/main";
import Layout from "../Layout";
import Empty from "../Empty";
import Form from "../Form";
const Reviews = ({
    reviews,
    id,
    setProduct
}) => {
    const {setStars} = useContext(UtilsCtx);
    const {api, setProducts, userId} = useContext(MainCtx);
    const [reviewsCnt, setReviewsCnt] = useState(4);
    const [showAll, setShowAll] = useState(false);
    const [addReview, setAddReview] = useState(false)
    useEffect(() => {
        setReviewsCnt(showAll ? reviews.length : 4);
    }, [showAll])

    const reviewHandler = (body) => {
        api.addReview(id, body)
            .then(data => {
                setAddReview(false);
                setProduct(data);
                setProducts(prev => prev.map(el => {
                    if (el._id === id) {
                        return data;
                    }
                    return el;
                }))
            })
    }
    const delReview = (review) => {
        api.delReview(id, review)
            .then(data => {
                setProduct(data);
                setProducts(prev => prev.map(el => {
                    if (el._id === id) {
                        return data;
                    }
                    return el;
                }))
            })
    }
    return <div className="product__reviews">
        <h2 className="product__title">Отзывы</h2>
        <div className="reviews__add">
            {!addReview &&
                <button
                    className="form__btn"
                    onClick={() => setAddReview(true)}
                >Оставить отзыв</button>
            }
            {addReview && <>
                <Form type="review" cb={reviewHandler}/>
                <button
                    className="form__btn"
                    onClick={() => setAddReview(false)}
                >Отменить</button>
            </>}
        </div>

        <Layout mb={2} dt={4}>
            {reviews.slice(0, reviewsCnt).map((el, i) => <div key={i} className="review">
                <div className="review__img" style={{
                    backgroundImage: `url(${el.author.avatar})`
                }}/>
                <h4 className="review__author">{el.author.name}</h4>
                <h3 className="review__rating">{setStars(el.rating)}</h3>
                <p className="review__text">{el.text}</p>
                <div className="review__footer">
                    <div className="review__date">{new Date(el.created_at).toLocaleString()}</div>
                    {el.author._id === userId && <i
                        className="lni lni-trash-can"
                        onClick={() => delReview(el._id)}
                    />}
                </div>
            </div>)}
            {reviews.length > 4 && <button
                className="reviews__btn"
                onClick={() => setShowAll(!showAll)}
            >
                {showAll ? "Скрыть все отзывы" : "Показать все отзывы"}
            </button>}
        </Layout>
        {reviews.length === 0 && <Empty type="review"/>}
    </div>
}

export default Reviews;