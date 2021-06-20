import { useParams } from "react-router-dom";
import MOCK_PHOTO_ARTICLES from '../../mock-data/mock-photo-articles';
import React, { useState, Component } from "react";
import { authorStyleSheet, photoStyleSheet, articleViewContainerStyleSheet, contentStyleSheet, titleStyleSheet } from "../articles/articlesStyles";

function PhotoArticleView({ photoArticle }) {
    // let { id } = useParams();
    // let initialState = MOCK_PHOTO_ARTICLES.find(photoArticle => photoArticle.id == id);
    // const [photoArticle, setPhotoArticle] = useState(initialState);

    const articleViewContainerStyle = articleViewContainerStyleSheet();
    const photoStyle = photoStyleSheet();
    const titleStyle = titleStyleSheet();
    const authorStyle = authorStyleSheet();
    const contentStyle = contentStyleSheet();

    return (
        <div style={articleViewContainerStyle}>
            <img style={photoStyle} src={photoArticle.photoUrl} />
            <h3 style={titleStyle}>{photoArticle.title}</h3>
            <div style={authorStyle}>--- {photoArticle.author} ---</div>
        </div>
    );
}

export { PhotoArticleView };