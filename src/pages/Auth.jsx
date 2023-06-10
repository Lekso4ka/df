import Form from "../components/Form";
import Layout from "../components/Layout";

export function Auth () {
    return <Layout>
        <h1>Страница авторизации</h1>
        <div style={{width: "400px"}}>
            <Form/>
        </div>
    </Layout>
}