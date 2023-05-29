import "./index.css";

const News = ({data, isTitled=false}) => {
    return <a
        target="_blank"
        href={data.url}
        rel="noreferrer"
        className="news"
    >
        <img src={data.urlToImage} alt={data.title} className="news__img"/>
        <span className="news__content">
            {isTitled && <span className="news__title">{data.title}</span>}
            <span className="news__date">{new Date(data.publishedAt).toLocaleDateString()}</span>
        </span>
    </a>
}

export default News;