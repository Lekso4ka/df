import {useContext} from "react";
import UtilsCtx from "../../context/utils";
const Description = ({
    description
}) => {
    const {setDescription} = useContext(UtilsCtx);
    return <div className="product__description">
        <h2 className="product__title">Описание</h2>
        {setDescription(description).map((el, i) => <p key={i}>{el}</p>)}
    </div>
}

export default Description;