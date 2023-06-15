import {useState} from "react";

import Input from "./fields/Input";
import Select from "./fields/Select";
import Textarea from "./fields/Textarea";
import Image from "./fields/Image";
import Password from "./fields/Password";
import Search from "./Search";

import AuthForm from "./forms/AuthForm";
import ProductForm from "./forms/ProductForm";
import ReviewForm from "./forms/ReviewForm";

import "./index.css";

// TODO: Добавить компонент с checkbox
// TODO: Добавить компонент с тегами

const Form = ({
    type,
    fieldsType,
    cb = () => {}
}) => {
    const authFields = ["email", "password"];
    const regFields = ["email", "name", "avatar", "about", "password"];
    const pwdFields = ["email", "token", "password"];

    return <>
        {type === "auth" && <>
            {fieldsType === "login" && <AuthForm
                fields={authFields}
                btnText="Войти"
                cb={cb}
            />}
            {fieldsType === "signup" && <AuthForm
                fields={regFields}
                comparePwd={true}
                btnText="Зарегистрироваться"
                cb={cb}
            />}
            {fieldsType === "getToken" && <AuthForm
                fields={pwdFields.slice(0,1)}
                btnText="Получить токен"
                cb={cb}
            />}
            {fieldsType === "updPwd" && <AuthForm
                fields={pwdFields.slice(1)}
                comparePwd={true}
                btnText="Обновить пароль"
                cb={cb}
            />}
        </>}
        {type === "product" && <>
            <ProductForm/>
        </>}
        {type === "review" && <>
            <ReviewForm/>
        </>}
    </>
}

export {
    Input,
    Search,
    Textarea,
    Select,
    Password,
    Image,
    AuthForm,
    ProductForm,
    ReviewForm
};

export default Form;