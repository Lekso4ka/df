import Layout from "../Layout";
import {Link} from "../Nav";

import "./index.css";

const Empty = ({type = "load"}) => {
    const content = {
        "404": {
            icon: "sad",
            title: "404",
            text: "Страница расстроилась и сбежала"
        },
        "filter": {
            icon: "funnel",
            title: "Товары не найдены",
            text: "Товары с указанными фильтрами отсутствуют"
        },
        "category": {
            icon: "layers",
            title: "Товары не найдены",
            text: "В данной категории нет ни одного товара"
        },
        "favorite": {
            icon: "heart",
            title: "Ничего не понравилось?",
            text: "У вас еще нет ни одного любимого товара"
        },
        "basket": {
            icon: "cart",
            title: "В корзине пусто",
            text: "В вашей корзине еще нет ни одного товара"
        },
        "load": {
            icon: "reload",
            title: "Идет загрузка"
        },
        "review": {
            icon: "users",
            text: "Тут пока еще нет отзывов"
        }
    }
    return <>
        {type !== "no-user"
            ? <Layout fullHeight={true}>
                <div className="empty">
                    {content[type].icon && <i className={`lni lni-${content[type].icon} empty__icon ${type === "load" ? "empty__loader" : ""}`}/>}
                    {content[type].title && <h3 className="empty__title">{content[type].title}</h3>}
                    {content[type].text && <p className="empty__text">{content[type].text}</p>}
                </div>
            </Layout>
            : <Layout>
                <div className="empty empty_link">
                    Пожалуйста&nbsp;
                    <Link title="войтите" path="/auth"/>
                    , чтобы отобразить товары
                </div>
            </Layout>
        }
    </>
}

export default Empty;