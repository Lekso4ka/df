import {useContext} from "react";
import {useNavigate} from "react-router-dom";

import Layout from "../components/Layout";
import Form from "../components/Form";
import MainCtx from "../context/main";

export function AddProduct () {
    const {api, setProducts} = useContext(MainCtx);
    const navigate = useNavigate();

    const addHandler = (body) => {
        api.addProduct(body)
            .then(data => {
                console.log(data);
                if (data) {
                    setProducts(prev => [...prev, data])
                    navigate("/products")
                }
            })
    }
    return <Layout>
        <h1>Добавить товар</h1>
        <Form type="product" cb={addHandler}/>
    </Layout>
}