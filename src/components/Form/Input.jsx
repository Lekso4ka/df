const Input = ({
    name,
    label,
    attr
}) => {
    return <div className="form__row">
        <label className="form__lbl" htmlFor={name}>
            {label}
            {attr?.required && <>&nbsp;<span className="form__lbl_req">*</span></>}
        </label>
        <input className="form__inp" id={name} {...attr}/>
    </div>
}

export default Input;