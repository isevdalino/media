import React, { useState, useEffect } from "react";
import ArticleList from './ArticleList';
import { containerStyleSheet, createArticleButtonStyleSheet, createArticleIconStyleSheet } from './articlesStyles.js'
import { Link } from "react-router-dom";
import { CREATE_ARTICLE } from "../../constants/Paths";
import MOCK_ARTICLES from "../../mock-data/mock-articles";
import { fetchArticles } from "../../server-requests/requests";

function ShowAllArticlesView() {
    const containerStyle = containerStyleSheet();
    const buttonStyle = createArticleButtonStyleSheet();
    const addArticleIconStyle = createArticleIconStyleSheet();

    const [articles, setArticles] = useState(MOCK_ARTICLES);

    useEffect(() => {
        fetchArticles().then(newArticles => setArticles(newArticles));
    }, []);

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

export { ShowAllArticlesView };