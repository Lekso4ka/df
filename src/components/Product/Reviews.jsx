const Reviews = ({
    reviews
}) => {
    // TODO: нет отзывов
    console.log(reviews);
    return <div className="product__reviews">
        <h2 className="product__title">Отзывы</h2>
        {reviews.map((el, i) => <div key={i}>
            {el.rating} {el.text}
        </div>)}
    </div>
}

export default Reviews;