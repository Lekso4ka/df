import {useContext} from "react";

import Layout from "../components/Layout";
import Banner from "../components/Banner";
import Adds from "../components/Adds";
import News from "../components/News";
import Carousel from "../components/Carousel";
import Card from "../components/Card";

import MainCtx from "../context/main";
import UtilsCtx from "../context/utils";

import bannersData from "../assets/data/banners.json";
import addsData from "../assets/data/adds.json";
import Empty from "../components/Empty";

export function Home () {
    const {
        news,
        newsLenta,
        products,
        screen,
        userId,
        resent
    } = useContext(MainCtx);
    addsData.sort((a, b) => Math.random() - 0.5)
    const { sortPro, getNumber } = useContext(UtilsCtx);
    const favGoods = sortPro(products).byPopular("down", true).data.slice(0, screen < 1064 ? 2 : 4);
    const newGoods = sortPro(products).byDate().data.slice(0, screen < 1064 ? 2 : 4);
    return <>
        <Banner {...bannersData[2]} pattern={false} bgPos="50% 38%"/>
        <Layout>
            <Adds {...addsData[0]}/>
        </Layout>
        {userId ? <>
            {newGoods.length > 0 && <Layout mb={2} dt={4} title="Новинки">
                {newGoods.map(el => <Card key={el._id} {...el}/>)}
            </Layout>}
        </> : <Empty type="no-user"/>}
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
        {userId ? <>
            {favGoods.length > 0 && <Layout mb={2} dt={4} title="Популярные товары">
                {favGoods.map(el => <Card key={el._id} {...el}/>)}
            </Layout>}
        </> : <Empty type="no-user"/>}
        <Layout dt={2}>
            <Adds {...addsData[3]}/>
            <Adds {...addsData[4]}/>
        </Layout>
        {userId ? <>
            {resent.length > 0 && <Layout mb={2} dt={4} title="Вы недавно смотрели">
                {resent.map(el => <Card key={el._id} {...el}/>).slice(0, screen < 1064 ? 2 : 4)}
            </Layout>}
        </> : <Empty type="no-user"/>}
        {newsLenta.length > 0 && <Layout mb={1} dt={2} title="Новости Lenta.ru">
            <Carousel
                data={newsLenta.map((el, i) => <News key={`new-${i}`} data={el}/>)}
                cnt={window.innerWidth < 1064 ? 1 : 2}
            />
        </Layout>}
        <Layout>
            <Adds {...addsData[5]}/>
        </Layout>
    </>
}