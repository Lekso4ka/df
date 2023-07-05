import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import Layout from "../components/Layout";
import Empty from "../components/Empty";
import Product from "../components/Product";

import MainCtx from "../context/main";

export function SingleProduct () {
    const {id} = useParams();
    const {api} = useContext(MainCtx);
    const [product, setProduct] = useState({});

    useEffect(() => {
        api.getProduct(id)
            .then(data => {
                setProduct(data);
            })
    }, [])
    return <>
        {product.name ? <Layout title={product.name} dt={2}>
            <div>
                {product.tags.length > 0 && <Product.Tags tags={product.tags}/>}
                <Product.Image
                    pictures={product.pictures}
                    name={product.name}
                />
            </div>
            <Product.Info {...product} setProduct={setProduct}/>
            <Product.Description description={product.description}/>
            <Product.Reviews
                reviews={product.reviews}
                id={id}
                setProduct={setProduct}
            />
        </Layout> : <Empty type="load"/>}
    </>
}