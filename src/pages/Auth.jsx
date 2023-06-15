import {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";

import Form from "../components/Form";
import Layout from "../components/Layout";

import MainCtx from "../context/main";

export function Auth () {
    const [index, setIndex] = useState(0);
    const types = ["login", "signup", "getToken", "updPwd"];
    const names = ["Войти", "Зарегистрироваться", "Восстановить пароль", "Восстановить пароль"];

    const {api, setUserId} = useContext(MainCtx);
    const navigate = useNavigate();

    const authHandler = (body) => {
        api.login(body)
            .then(data => {
                if (data) {
                    localStorage.setItem("user-token", data.token);
                    localStorage.setItem("user-id", data.data._id);
                    setUserId(data.data._id);
                    navigate("/profile");
                }
            })
    };
    const regHandler = (body) => {
        body.group = process.env.REACT_APP_GROUP;
        api.signup(body)
            .then(data => {
                if (data) {
                    authHandler({
                        "email": body.email,
                        "password": body.password
                    });
                }
            })
    };
    const tokenHandler = (body) => {
        api.forgotPwd(body)
            .then(data => {
                if (data) {
                    setIndex(3)
                }
            });
    };
    const pwdHandler = (body) => {
        api.resetPwd(body)
            .then(data => {
                if (data) {
                    localStorage.setItem("user-token", data.token);
                    localStorage.setItem("user-id", data.data._id);
                    setUserId(data.data._id);
                    navigate("/profile");
                }
            })
    };

    const handlers = [authHandler, regHandler, tokenHandler, pwdHandler];

    return <Layout>
        <div className="form__wrapper">
            <h1>{names[index]}</h1>
            <Form type="auth" fieldsType={types[index]} cb={handlers[index]}/>
            <div className="form__links">
                {index !== 0 && <button
                    className="form__link"
                    onClick={() => setIndex(0)}
                >Войти</button>}
                {index !== 1 && <button
                    className="form__link"
                    onClick={() => setIndex(1)}
                >Зарегистрироваться</button>}
                {index !== 2 && index !== 3 && <button
                    className="form__link"
                    onClick={() => setIndex(2)}
                >Восстановить парроль</button>}
            </div>
        </div>
    </Layout>
}