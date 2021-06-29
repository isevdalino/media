import React from "react";
import { getReadableDateTime } from "../../constants/common";
import { SEARCH } from "../../constants/Paths";
import { articleViewContainerStyleSheet, photoStyleSheet, titleStyleSheet } from "../articles/articlesStyles";

function PhotoArticleView({ photoArticle }) {
    const articleViewContainerStyle = articleViewContainerStyleSheet();
    const photoStyle = photoStyleSheet();
    const titleStyle = titleStyleSheet();
    const topicLinkStyle = {
        float: "left",
    };

    return (
        <div style={articleViewContainerStyle}>
            <img style={photoStyle} src={photoArticle.photoUrl} />
            <h3 style={titleStyle}>{photoArticle.title}</h3>
            <div style={{ color: "Grey", textAlign: "right" }}>--- {photoArticle.author} ---</div>
            <p><a href={SEARCH + '?t=' + photoArticle.topic} style={topicLinkStyle}>{photoArticle.topic}</a></p>
            <div style={{ textAlign: "right" }}>{getReadableDateTime(photoArticle.createdAt)}</div>
        </div>
    );
}

export { PhotoArticleView };
