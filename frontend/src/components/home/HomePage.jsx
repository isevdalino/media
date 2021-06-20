import React, { useState, Component } from "react";
import ArticleList from '../articles/ArticleList';
import MOCK_ARTICLES from '../../mock-data/mock-articles';
import MOCK_TOPICS from '../../mock-data/mock-topics';
import MOCK_PHOTO_ARTICLES from '../../mock-data/mock-photo-articles';
import MOCK_POLLS from '../../mock-data/mock-polls';
import { Link } from "react-router-dom";
import { containerStyleSheet } from '../articles/articlesStyles.js'
import TopicList from "../topics/TopicList";
import PhotoArticleList from "../photo-articles/PhotoArticleList";
import PollList from "../polls/PollList";
import { ARTICLES, PHOTO_ARTICLES, POLLS } from "../../constants/Paths";

function HomePage() {
    const [articles, setArticles] = useState(MOCK_ARTICLES);

    const [topics, setTopics] = useState(MOCK_TOPICS);

    const [photoArticles, setPhotoArticles] = useState(MOCK_PHOTO_ARTICLES);

    const [polls, setPolls] = useState(MOCK_POLLS);

    const containerStyle = containerStyleSheet();
    const buttonStyle = {
        float: "right",
    }

    const topMargin = {
        marginTop: "55px",
    }

    return (
        <div style={topMargin}>
            <TopicList topics={topics} />
            <div style={containerStyle}>
                <ArticleList articles={articles} />
                <Link to={ARTICLES}>
                    <button type="submit" className="btn btn-primary btn-block" style={buttonStyle}>
                        Read more...
                    </button>
                </Link>
            </div>
            <div style={containerStyle}>
                <h3 className="text-center">Gallery</h3>
                <PhotoArticleList photoArticles={photoArticles} />
                <Link to={PHOTO_ARTICLES}>
                    <button type="submit" className="btn btn-primary btn-block" style={buttonStyle}>
                        Read more...
                    </button>
                </Link>
            </div>
            <div style={containerStyle}>
                <h3 className="text-center">Polls</h3>
                <PollList polls={polls} />
                <Link to={POLLS}>
                    <button type="submit" className="btn btn-primary btn-block" style={buttonStyle}>
                        See all...
                    </button>
                </Link>
            </div>
        </div>
    );
}

export { HomePage };