import PhotoArticleList from './PhotoArticleList';
import { containerStyleSheet, createArticleButtonStyleSheet, createArticleIconStyleSheet } from '../articles/articlesStyles.js';
import { Link } from "react-router-dom";
import { CREATE_PHOTO_ARTICLE } from "../../constants/Paths";
import { fetchArticles } from "../../server-requests/requests";
import React, { useEffect, useState } from "react";

function ShowAllPhotoArticlesView({ isUserLoggedInState }) {

    const [photoArticles, setPhotoArticles] = useState([]);
    const containerStyle = containerStyleSheet();
    const buttonStyle = createArticleButtonStyleSheet();
    const addArticleIconStyle = createArticleIconStyleSheet();

    useEffect(() => {
        fetchArticles(0,true).then(newPhotoArticles => setPhotoArticles(newPhotoArticles));
    }, []);

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