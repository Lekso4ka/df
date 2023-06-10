const Textarea = ({
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
        <textarea
            rows={4}
            className="form__inp form__text"
            id={name}
            {...attr}
            value={state[0]}
            onChange={(e) => state[1](e.target.value)}
        />
    </div>
}

export default Textarea;