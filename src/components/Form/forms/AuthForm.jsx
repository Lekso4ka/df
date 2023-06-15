import {useState} from "react";

import formData from "../../../assets/data/form.json";
import useFormState from "../../../hooks/useFormState";

import Textarea from "../fields/Textarea";
import Select from "../fields/Select";
import Image from "../fields/Image";
import Password from "../fields/Password";
import Input from "../fields/Input";

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
        {fields.map(el => {
            const elData = data[el];
            switch (elData.format) {
                case "textarea":
                    return <Textarea key={el} name={el} {...elData} state={states[el]}/>
                case "select":
                    return <Select key={el} name={el} {...elData} state={states[el]}/>
                case "image":
                    return <Image key={el} name={el} {...elData} state={states[el]} />
                case "password":
                    return <Password key={el} name={el} {...elData} state={states[el]} compare={comparePwd} setSimilar={setSimilarPwd}/>
                default:
                    return <Input key={el} name={el} {...elData} state={states[el]} />
            }
        })}
        <button
            type="submit"
            className="form__btn"
            disabled={comparePwd && !similarPwd}
        >{btnText}</button>
    </form>
}

export default AuthFrom;