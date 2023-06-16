import {useState} from "react";

import formData from "../../../assets/data/form.json";
import useFormState from "../../../hooks/useFormState";
import {renderTags} from "../utils";

const AuthFrom = ({
    fields,
    btnText,
    comparePwd = false,
    cb = () => {}
}) => {
    const [similarPwd, setSimilarPwd] = useState(false)
    const data = formData.user;
    const states = useFormState("user")();

    const formHandler = (e) => {
        e.preventDefault();
        const body = {};
        fields.forEach(el => {
            body[el] = states[el][0];
        })
        cb(body);
    }

    return <form onSubmit={formHandler} className="form form_auth">
        {renderTags(fields, data, states, comparePwd, setSimilarPwd)}
        <button
            type="submit"
            className="form__btn"
            disabled={comparePwd && !similarPwd}
        >{btnText}</button>
    </form>
}

export default AuthFrom;