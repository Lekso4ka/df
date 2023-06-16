import Layout from "../Layout";
import Logo from "../Logo";
import Nav from "../Nav";

import menu from "../../assets/data/menu.json"
import "./index.css";

const Footer = () => {
    return <footer className="footer">
        <Layout dt={3}>
            <div className="footer__menu">
                <Nav menu={menu.footer} position="vertical"/>
            </div>
            <div className="footer__sign">
                <Logo position="vertical"/>
                <div className="footer__text">
                    <span>Make by <a href="https://github.com/lekso4ka" target="_blank" rel="noreferrer">Leksa</a> width <i className="lni lni-heart"/></span>
                    <span>©{new Date().getFullYear()} All rights reserved</span>
                </div>
            </div>
            <hr className="footer__separator"/>
            <Nav menu={menu.links_1} position="vertical"/>
            <Nav menu={menu.links_2} position="vertical"/>
            <Nav menu={menu.links_3} position="vertical"/>
        </Layout>
    </footer>
}

export default Footer;