import {Default} from "../../../assets/images";

const Image = ({
    name,
    label,
    attr,
    state,
    position
}) => {
    const imgStyle = {
        backgroundImage: `url(${state[0] || Default})`,
        backgroundSize: state[0] ? "cover" : "auto 80%"
    }
    return <div className={`form__row ${position === "right" ? "form__row_image" : ""}`}>
        <div
            className={`form__image ${position === "top" ? "form__image_top" : "form__image_right"}`}
            style={imgStyle}
        />
        <label className="form__lbl" htmlFor={name}>
            {label}
            {attr?.required && <>&nbsp;<span className="form__lbl_req">*</span></>}
        </label>
        <input
            className="form__inp"
            id={name}
            {...attr}
            value={state[0]}
            onChange={(e) => state[1](e.target.value)}
        />
    </div>
}

export default Image;