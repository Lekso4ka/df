const Input = ({
    name,
    label,
    attr,
    state
}) => {
    return <div className="form__row">
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

export default Input;