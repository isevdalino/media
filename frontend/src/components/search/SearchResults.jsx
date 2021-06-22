import React, { useEffect, useState } from "react";
import ArticleList from '../articles/ArticleList';
import MOCK_ARTICLES from '../../mock-data/mock-articles';
import MOCK_PHOTO_ARTICLES from '../../mock-data/mock-photo-articles';
import { containerStyleSheet } from '../articles/articlesStyles.js'
import PhotoArticleList from "../photo-articles/PhotoArticleList";
import { fetchArticles } from "../../server-requests/requests";

function SearchResults() {
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');

    console.log("searchQuery: " + searchQuery);

    const [articles, setArticles] = useState(MOCK_ARTICLES);
    const [photoArticles, setPhotoArticles] = useState(MOCK_PHOTO_ARTICLES);
    const containerStyle = containerStyleSheet();
    const topMargin = {
        marginTop: "55px",
    }

    useEffect(() => {
        fetchArticles().then(newArticles => setArticles(newArticles));
    }, []);

    return (
        <div style={topMargin}>
            <div style={containerStyle}>
                <ArticleList articles={articles} />
            </div>
            <div style={containerStyle}>
                <h3 className="text-center">Gallery</h3>
                <PhotoArticleList photoArticles={photoArticles} />
            </div>
        </div>
    );
}

export { SearchResults };