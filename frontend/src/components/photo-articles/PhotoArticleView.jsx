import React from "react";
import { SEARCH } from "../../constants/Paths";
import { authorStyleSheet, photoStyleSheet, articleViewContainerStyleSheet, titleStyleSheet } from "../articles/articlesStyles";

function PhotoArticleView({ photoArticle }) {
    const articleViewContainerStyle = articleViewContainerStyleSheet();
    const photoStyle = photoStyleSheet();
    const titleStyle = titleStyleSheet();
    const authorStyle = authorStyleSheet();
    const topicLinkStyle = {
        float: "left",
    };

    return (
        <div style={articleViewContainerStyle}>
            <img style={photoStyle} src={photoArticle.photoUrl} />
            <h3 style={titleStyle}>{photoArticle.title}</h3>
            <div style={authorStyle}>--- {photoArticle.author} ---</div>
            <p><a href={SEARCH + '?t=' + photoArticle.topic} style={topicLinkStyle}>{photoArticle.topic}</a></p>
        </div>
    );
}

export { PhotoArticleView };