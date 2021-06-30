import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { hasMoreElementsInList } from "../../constants/common";
import { ITEMS_COUNT } from "../../constants/constants";
import { CREATE_ARTICLE } from "../../constants/Paths";
import { fetchArticles } from "../../server-requests/requests";
import ArticleList from './ArticleList';
import { createArticleButtonStyleSheet, createArticleIconStyleSheet, scrollableContainerStyleSheet } from './articlesStyles.js';

function ShowAllArticlesView({ isUserLoggedInState }) {
    const containerStyle = scrollableContainerStyleSheet();
    const buttonStyle = createArticleButtonStyleSheet();
    const addArticleIconStyle = createArticleIconStyleSheet();

    const [articles, setArticles] = useState([]);
    const [hasMoreElements, setHasMoreElements] = useState(true);

    const fetchArticlesFunction = () => {
        fetchArticles(articles.length + ITEMS_COUNT)
            .then(newArticles => {
                if (hasMoreElementsInList(articles, newArticles, ITEMS_COUNT)) {
                    setHasMoreElements(false);
                }
                setArticles(newArticles);
            });
    };

    useEffect(() => {
        fetchArticles(0,false).then(newArticles => setArticles(newArticles));
    }, []);

    return (
        <div style={{ marginTop: "60px" }}>
            {isUserLoggedInState &&
                <Link to={CREATE_ARTICLE}>
                    <button type="submit" className="btn btn-primary btn-block" style={buttonStyle}>
                        New article
                        <img style={addArticleIconStyle} src={'pencil_writing_icon.png'} />
                    </button>
                </Link>
            }
            <div id="scrollableDiv" style={containerStyle}>
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchArticlesFunction}
                    hasMore={hasMoreElements}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="scrollableDiv"
                >
                    <div>
                        <ArticleList articles={articles} />
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    );
}

export { ShowAllArticlesView };

