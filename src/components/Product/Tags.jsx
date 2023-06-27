import {useNavigate} from "react-router-dom";

const Tags = ({
    tags
}) => {
    const navigate = useNavigate();
    return <div className="product__tags">
        {tags.map((el, i) => <button
            key={i}
            className="product__tag"
            onClick={() => navigate(`/products/category/${el}`)}
        >{el}</button>)}
    </div>
}

export default Tags;