import Layout from "../components/Layout";
import Banner from "../components/Banner";


import bannersData from "../assets/data/banners.json";

export function Home () {
    return <>
        <Banner {...bannersData[0]} />
        <Banner {...bannersData[1]} />
        <Banner {...bannersData[2]} pattern={false} bgPos="50% 38%"/>
    </>
}