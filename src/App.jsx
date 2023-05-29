import {useState, useEffect} from "react";
import { Routes, Route, Link } from "react-router-dom";

import {
    About,
    AddProduct,
    Auth,
    Basket,
    Delivery,
    Home,
    Products,
    Profile,
    SingleProduct
} from "./pages"
import Main from "./context/main";

import Layout from "./components/Layout";

function App() {
    const [news, setNews] = useState([]);
    const [newsLenta, setNewsLenta] = useState([]);

    useEffect(() => {
        fetch(`https://newsapi.org/v2/everything?q=собаки&apiKey=${process.env.REACT_APP_NEWS_KEY}`)
            .then(res => res.json())
            .then(data => {
                setNews(data.articles.filter(el => el.source.name === "Techinsider.ru"));
            })
        fetch(`https://newsapi.org/v2/everything?q=собаки&sources=lenta&apiKey=${process.env.REACT_APP_NEWS_KEY}`)
            .then(res => res.json())
            .then(data => {
                setNewsLenta(data.articles);
            })
    }, []);

    const mainCtx = {
        news,
        newsLenta
    }

    return <Main.Provider value={mainCtx}>
        <Layout>
            <ul className="menu">
                <li><Link to="/">Главная</Link></li>
                <li><Link to="/products">Каталог</Link>
                    <ul>
                        <li><Link to="/products/category/delicious">Лакомства</Link></li>
                        <li><Link to="/products/category/toys">Игрушки</Link></li>
                        <li><Link to="/products/favorites">Любимые товары</Link></li>
                    </ul>
                </li>
                <li><Link to="/product/ball">Мячик для собак</Link></li>
                <li><Link to="/product/add">Добавить товар</Link></li>
                <li><Link to="/basket">Корзина</Link></li>
                <li><Link to="/profile">Профиль</Link></li>
                <li><Link to="/auth">Войти</Link></li>
                <li><Link to="/delivery">Доставка</Link></li>
                <li><Link to="/about">О нас</Link></li>
            </ul>
            <span>{process.env.REACT_APP_USER_NAME}</span>
        </Layout>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/products/category/:name" element={<Products isCat={true}/>}/>
            <Route path="/products/favorites" element={<Products isFav={true}/>}/>
            <Route path="/product/:id" element={<SingleProduct/>}/>
            <Route path="/product/add" element={<AddProduct/>}/>
            <Route path="/basket" element={<Basket/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/auth" element={<Auth/>}/>
            <Route path="/delivery" element={<Delivery/>}/>
            <Route path="/about" element={<About/>}/>
        </Routes>
    </Main.Provider>
}

export default App;
