const Select = ({values}) => {
    return <div className="form__row">
        <label className="form__lbl" htmlFor="inp">
            Тратата&nbsp;
            <span className="form__lbl_req">*</span>
        </label>
        <div className="form__select">
            <select className="form__inp" id="inp">
                {values.map(el => <option key={el}>{el}</option>)}
            </select>
        </div>
    </div>
}

export default Select;