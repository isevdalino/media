import React, { useState, Component } from "react";
import ArticleList from './ArticleList';
import MOCK_ARTICLES from '../../mock-data/mock-articles';
import { containerStyleSheet, createArticleButtonStyleSheet, createArticleIconStyleSheet } from './articlesStyles.js'
import { Link } from "react-router-dom";
import { CREATE_ARTICLE } from "../../constants/Paths";

function Articles() {

    const [articles, setArticles] = useState(MOCK_ARTICLES);
    const containerStyle = containerStyleSheet();
    const buttonStyle = createArticleButtonStyleSheet();
    const addArticleIconStyle = createArticleIconStyleSheet();

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