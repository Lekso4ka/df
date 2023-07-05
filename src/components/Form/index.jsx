import Input from "./fields/Input";
import Select from "./fields/Select";
import Textarea from "./fields/Textarea";
import Image from "./fields/Image";
import Password from "./fields/Password";
import Switch from "./fields/Switch";
import Tag from "./fields/Tag";
import Search from "./Search";

import AuthForm from "./forms/AuthForm";
import ProductForm from "./forms/ProductForm";
import ReviewForm from "./forms/ReviewForm";

import "./index.css";

const Form = ({
    type,
    fieldsType,
    cb = () => {}
}) => {
    const authFields = ["email", "password"];
    const regFields = ["email", "name", "avatar", "about", "password"];
    const pwdFields = ["email", "token", "password"];
    const productFields = ["name", "pictures", "price", "discount", "stock", "wight", "description", "tags", "available", "isPublished"];
    const reviewFields = ["rating", "text"];
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
            <ProductForm
                fields={productFields}
                btnText="Добавить товар"
                cb={cb}
            />
        </>}
        {type === "review" && <>
            <ReviewForm
                fields={reviewFields}
                btnText="Оставить отзыв"
                cb={cb}
            />
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
    ReviewForm,
    Tag,
    Switch
};

export default Form;