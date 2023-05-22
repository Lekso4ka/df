import "./index.css";
import {Banners as BannersImg} from "../../assets/images";
import Layout from "../Layout";

const Banner = ({
    text,
    bg,
    title="DogFood",
    main=true,
    pattern=true,
    bgPos="center"
}) => {
    const bannerStyle = {
        backgroundImage: `url(${BannersImg[bg]})`,
        backgroundSize: pattern ? "contain" : "cover",
        backgroundPosition: bgPos
    }

    return <div className="banner" style={bannerStyle}>
        <Layout gap="small">
            {main
                ? <h1 className="banner__caption">{title}</h1>
                : <h2 className="banner__caption">{title}</h2>}
            <div className="banner__text">{text}</div>
        </Layout>
    </div>
}
export default Banner;