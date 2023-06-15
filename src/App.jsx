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
import Api from "./Api";
import staticNews from "./assets/data/news.json";

import Layout from "./components/Layout";

function App() {
    let n1 = sessionStorage.getItem("dogs-news");
    if (n1) {
        n1 = JSON.parse(n1);
    }
    let n2 = sessionStorage.getItem("lenta-news");
    if (n2) {
        n2 = JSON.parse(n2);
    }
    const [news, setNews] = useState(n1 || []);
    const [newsLenta, setNewsLenta] = useState(n2 || []);
    const [token, setToken] = useState(localStorage.getItem("user-token"));
    const [userId, setUserId] = useState(localStorage.getItem("user-id"));
    const [api, setApi] = useState(new Api(token));

    useEffect(() => {
        if (process.env.NODE_ENV === "development") {
            if (!news.length) {
                fetch(`https://newsapi.org/v2/everything?q=собаки&apiKey=${process.env.REACT_APP_NEWS_KEY}`)
                    .then(res => res.json())
                    .then(data => {
                        const result = data.articles.filter(el => el.source.name === "Techinsider.ru")
                        sessionStorage.setItem("dogs-news", JSON.stringify(result));
                        setNews(result);
                    })
            }
            if (!newsLenta.length) {
                fetch(`https://newsapi.org/v2/everything?q=собаки&sources=lenta&apiKey=${process.env.REACT_APP_NEWS_KEY}`)
                    .then(res => res.json())
                    .then(data => {
                        sessionStorage.setItem("lenta-news", JSON.stringify(data.articles));
                        setNewsLenta(data.articles);
                    })
            }
        } else {
            setNews(staticNews);
        }
    }, []);

    useEffect(() => {
        setApi(new Api(token))
    }, [token])

    useEffect(() => {
        setToken(localStorage.getItem("user-token"))
    }, [userId])

    const mainCtx = {
        news,
        newsLenta,
        api,
        userId,
        setUserId
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
