import { SERVER_ADDRESS } from "../constants/Paths";
import { Article } from "../models/article";

function fetchArticles() {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(SERVER_ADDRESS + "articles?limit=8", requestOptions)
        .then(response => response.json())
        .then(data =>
            data.map(article =>
                new Article(article._id, article.name, article.authorName, article.content, article.topic)
            )
        );
};

export { fetchArticles };