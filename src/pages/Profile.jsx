import {useContext} from "react"
import {useNavigate} from "react-router-dom";

import Layout from "../components/Layout";
import {Link} from "../components/Nav";

import MainCtx from "../context/main";

export function Profile () {
    const navigate = useNavigate();
    const {setUserId} = useContext(MainCtx)
    const logout = () => {
        localStorage.removeItem("user-id");
        localStorage.removeItem("user-token");
        setUserId("");
        navigate("/");
    }
    return <Layout>
        <h1>Личный кабинет</h1>
        <div>
            <button onClick={logout}>Выйти</button>
            <Link
                path="/product/add"
                title="Добавить товар"
                imgType="icon"
                imgPath="lni lni-plus"
            />
        </div>
    </Layout>
}