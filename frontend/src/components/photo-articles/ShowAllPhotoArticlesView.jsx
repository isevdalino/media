import React, { useState } from "react";
import PhotoArticleList from './PhotoArticleList';
import MOCK_PHOTO_ARTICLES from '../../mock-data/mock-photo-articles';
import { containerStyleSheet, createArticleButtonStyleSheet, createArticleIconStyleSheet } from '../articles/articlesStyles.js';
import { Link } from "react-router-dom";
import { CREATE_PHOTO_ARTICLE } from "../../constants/Paths";

function ShowAllPhotoArticlesView({ isUserLoggedInState }) {

    const [photoArticles, setPhotoArticles] = useState(MOCK_PHOTO_ARTICLES);
    const containerStyle = containerStyleSheet();
    const buttonStyle = createArticleButtonStyleSheet();
    const addArticleIconStyle = createArticleIconStyleSheet();

    return (
        <div>
            {isUserLoggedInState &&
                <Link to={CREATE_PHOTO_ARTICLE}>
                    <button type="submit" className="btn btn-primary btn-block" style={buttonStyle}>
                        New photo
                    <img style={addArticleIconStyle} src={'pencil_writing_icon.png'} />
                    </button>
                </Link>
            }
            <div style={containerStyle}>
                <PhotoArticleList photoArticles={photoArticles} />
            </div>
        </div>
    );
}

export { ShowAllPhotoArticlesView };