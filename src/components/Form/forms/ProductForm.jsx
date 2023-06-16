import {useState} from "react";

import formData from "../../../assets/data/form.json";
import useFormState from "../../../hooks/useFormState";
import {renderTags} from "../utils";
import Layout from "../../Layout";

const ProductForm = ({
    fields,
    btnText,
    cb = () => {}
}) => {
    const data = formData.product;
    const states = useFormState("product")();

    const formHandler = (e) => {
        e.preventDefault();
        const body = {};
        fields.forEach(el => {
            body[el] = states[el][0];
        })
        cb(body);
    }

    return <form onSubmit={formHandler} className="form form_product">
        <Layout dt={2}>
            {renderTags(fields, data, states)}
            <button
                type="submit"
                className="form__btn"
            >{btnText}</button>
        </Layout>
    </form>
}

export default ProductForm;