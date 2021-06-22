import React, { useState, Component, useEffect } from "react";
import ArticleList from './ArticleList';
import MOCK_ARTICLES from '../../mock-data/mock-articles';
import { containerStyleSheet, createArticleButtonStyleSheet, createArticleIconStyleSheet } from './articlesStyles.js'
import { Link } from "react-router-dom";
import { CREATE_ARTICLE, SERVER_ADDRESS } from "../../constants/Paths";
import { Article } from "../../models/article";

function Articles() {

    const [articles, setArticles] = useState(MOCK_ARTICLES);
    const containerStyle = containerStyleSheet();
    const buttonStyle = createArticleButtonStyleSheet();
    const addArticleIconStyle = createArticleIconStyleSheet();

    useEffect(() => {
        const requestOptions = {
            method: 'GET'
        };

        fetch(SERVER_ADDRESS + "articles?limit=8", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setArticles(data.map(article =>
                    new Article(article._id, article.name, article.authorName, article.content, article.topic)
                ));
            });
    });

    return (
        <div>
            <Link to={CREATE_ARTICLE}>
                <button type="submit" className="btn btn-primary btn-block" style={buttonStyle}>
                    New article
                    <img style={addArticleIconStyle} src={'pencil_writing_icon.png'} />
                </button>
            </Link>
            <div style={containerStyle}>
                <ArticleList articles={articles} />
            </div>
        </div>

    );
}

export { Articles };