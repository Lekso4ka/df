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
    SingleProduct
} from "./pages"
import Main from "./context/main";
import Utils, {initialValue as utilsVal} from "./context/utils";
import Api from "./Api";

import Header from "./components/Header";
import Footer from "./components/Footer";

import staticNews from "./assets/data/news.json";

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
        if (token) {
            api.getProducts()
                .then(data => {
                    setProducts(data.products);
                })
        }
    }, []);

    useEffect(() => {
        if (token) {
            api.getProducts()
                .then(data => {
                    setProducts(data.products);
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

    const mainCtx = {
        news,
        newsLenta,
        api,
        userId,
        setUserId,
        screen,
        products,
        setProducts
    }

    return <Main.Provider value={mainCtx}>
        <Utils.Provider value={utilsVal}>
            <Header/>
            <main>
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
            </main>
            <Footer/>
        </Utils.Provider>
    </Main.Provider>
}

export default App;
