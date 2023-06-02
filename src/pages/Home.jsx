import {useContext} from "react";

import Layout from "../components/Layout";
import Banner from "../components/Banner";
import Adds from "../components/Adds";
import News from "../components/News";
import Carousel from "../components/Carousel";

import MainCtx from "../context/main";

import bannersData from "../assets/data/banners.json";
import addsData from "../assets/data/adds.json";



export function Home () {
    const { news, newsLenta } = useContext(MainCtx);
    return <>
        <Banner {...bannersData[2]} pattern={false} bgPos="50% 38%"/>
        <Layout>
            <Adds {...addsData[0]}/>
        </Layout>
        {news.length > 0 && <Layout mb={2} dt={4} title="Новости о собачках">
             <Carousel
                data={news.map((el, i) => <News key={`new-${i}`} data={el} isTitled={true} />)}
                cnt={window.innerWidth < 1064 ? 2 : 4}
            />
        </Layout>}
        <Layout dt={2}>
            <Adds {...addsData[1]}/>
            <Adds {...addsData[2]}/>
        </Layout>
        {newsLenta.length > 0 && <Layout mb={1} dt={2} title="Новости Lenta.ru">
            <Carousel
                data={newsLenta.map((el, i) => <News key={`new-${i}`} data={el}/>)}
                cnt={window.innerWidth < 1064 ? 1 : 2}
            />
        </Layout>}
        <Layout dt={2}>
            <Adds {...addsData[3]}/>
            <Adds {...addsData[4]}/>
        </Layout>
    </>
}