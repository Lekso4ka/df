import {
    Input,
    Select,
    Textarea,
    Search
} from "../components/Form";

import Layout from "../components/Layout";

export function Auth () {
    return <Layout>
        <h1>Страница авторизации</h1>
        <div style={{width: "400px"}}>
            <Input/>
            <Select values={[1,2,3,4]}/>
            <Textarea/>
            <Search/>
        </div>
    </Layout>
}