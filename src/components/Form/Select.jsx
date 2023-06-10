const Select = ({
    name,
    label,
    attr,
    options
}) => {
    return <div className="form__row">
        <label className="form__lbl" htmlFor={name}>
            {label}
            {attr?.required && <>&nbsp;<span className="form__lbl_req">*</span></>}
        </label>
        <div className="form__select">
            <select className="form__inp" id="inp" {...attr}>
                {options.map(el => <option key={el.val} value={el.val}>{el.text}</option>)}
            </select>
        </div>
    </div>
}

export default Select;