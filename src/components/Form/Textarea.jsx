const Textarea = ({}) => {
    return <div className="form__row">
        <label className="form__lbl" htmlFor="inp">
            Тратата&nbsp;
            <span className="form__lbl_req">*</span>
        </label>
        <textarea rows={4} className="form__inp form__text" id="inp" required/>
    </div>
}

export default Textarea;