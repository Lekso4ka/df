import {useState, useEffect} from "react";
import { Routes, Route } from "react-router-dom";

import {
    About,
    AddProduct,
    Auth,
    Basket,
    Delivery,
    Home,
    Products,
    Profile,
    SingleProduct,
    Favorites,
    Author
} from "./pages"
import Main from "./context/main";
import Utils, {initialValue as utilsVal} from "./context/utils";
import Api from "./Api";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Empty from "./components/Empty";

import staticNews from "./assets/data/news.json";
import blackList from "./assets/data/blackList.json";

function App() {
    let n1 = sessionStorage.getItem("dogs-news");
    if (n1) {
        n1 = JSON.parse(n1);
    }
    let n2 = sessionStorage.getItem("lenta-news");
    if (n2) {
        n2 = JSON.parse(n2);
    }
    let bk = sessionStorage.getItem("basket");
    if (bk) {
        bk = JSON.parse(bk);
    }
    let rs = sessionStorage.getItem("resent");
    if (rs) {
        rs = JSON.parse(rs);
    }
    const [news, setNews] = useState(n1 || []);
    const [newsLenta, setNewsLenta] = useState(n2 || []);
    const [basket, setBasket] = useState(bk || []);
    const [resent, setResent] = useState(rs || []);
    const [token, setToken] = useState(localStorage.getItem("user-token"));
    const [userId, setUserId] = useState(localStorage.getItem("user-id"));
    const [api, setApi] = useState(new Api(token));
    const [screen, setScreen] = useState(window.innerWidth);
    const [products, setProducts] = useState([]);

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
        window.addEventListener("resize", () => {
            setScreen(window.innerWidth);
        })
    }, []);

    useEffect(() => {
        if (token) {
            api.getProducts()
                .then(data => {
                    let changes = blackList.changeTags;
                    let changesNames = Object.keys(changes);
                    const arr = data.products;
                    // const arr = data.products.map(el => {
                    //     let hasTag = changesNames.filter(name => el.tags.includes(name));
                    //     hasTag.forEach(name => {
                    //         el.tags = el.tags.reduce((acc, tg) => {
                    //             if (tg === name && !acc.includes(changes[name])) {
                    //                 acc.push(changes[name])
                    //             } else if (tg !== name) {
                    //                 acc.push(tg)
                    //             }
                    //             return acc;
                    //         }, [])
                    //     })
                    //     return el;
                    // })
                    const result = utilsVal.filterPro(arr)
                        .byAuthor(blackList.authors, false)
                        .byTag(blackList.tags, false)
                        .byId(blackList.goods, false)
                        .data
                    setProducts(result);
                })
        } else {
            setProducts([]);
        }
    }, [api])

    useEffect(() => {
        setApi(new Api(token))
    }, [token])

    useEffect(() => {
        setToken(localStorage.getItem("user-token"))
    }, [userId])

    useEffect(() => {
        sessionStorage.setItem("resent", JSON.stringify(resent))
    }, [resent])

    useEffect(() => {
        sessionStorage.setItem("basket", JSON.stringify(basket))
    }, [basket])

    const mainCtx = {
        news,
        newsLenta,
        api,
        userId,
        setUserId,
        screen,
        products,
        setProducts,
        basket,
        setBasket,
        resent,
        setResent
    }

    return <Main.Provider value={mainCtx}>
        <Utils.Provider value={utilsVal}>
            <Header/>
            <main>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/products" element={<Products/>}/>
                    <Route path="/products/category/:name" element={<Products isCat={true}/>}/>
                    <Route path="/products/favorites" element={<Favorites />}/>
                    <Route path="/product/:id" element={<SingleProduct/>}/>
                    <Route path="/product/add" element={<AddProduct/>}/>
                    <Route path="/basket" element={<Basket/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/provider/:id" element={<Author/>}/>
                    <Route path="/auth" element={<Auth/>}/>
                    <Route path="/delivery" element={<Delivery/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/*" element={<Empty type="404"/>}/>
                </Routes>
            </main>
            <Footer/>
        </Utils.Provider>
    </Main.Provider>
}

export default App;
