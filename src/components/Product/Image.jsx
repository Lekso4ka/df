const Image = ({pictures, name}) => {
    return <img
        className="product__img"
        src={pictures}
        alt={name}
    />
}

export default Image;