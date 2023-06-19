const Switch = ({
    name,
    label,
    attr,
    state
}) => {
    return <div className="form__row">
        <input
            className="form__switch"
            id={name}
            value={state[0]}
            type="checkbox"
            {...attr}
            onChange={(e) => state[1](e.target.checked)}
        />
        <label className="form__lbl form__lbl_switch" htmlFor={name}>
            {label}
            {attr?.required && <>&nbsp;<span className="form__lbl_req">*</span></>}
        </label>
    </div>
}

export default Switch;