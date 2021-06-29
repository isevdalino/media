import React, { useState, Component, useEffect } from "react";
import ArticleList from '../articles/ArticleList';
import MOCK_PHOTO_ARTICLES from '../../mock-data/mock-photo-articles';
import { Link, useHistory } from "react-router-dom";
import { containerStyleSheet } from '../articles/articlesStyles.js'
import TopicList from "../topics/TopicList";
import PhotoArticleList from "../photo-articles/PhotoArticleList";
import PollList from "../polls/PollList";
import { ARTICLES, EVENTS, PHOTO_ARTICLES, POLLS, TOPICS } from "../../constants/Paths";
import { fetchArticles, fetchTopics, fetchPolls, fetchEvents } from "../../server-requests/requests";
import EventList from "../events/EventList";
import './homeStyles.css';

function HomePage() {
    const [articles, setArticles] = useState([]);

    const [topics, setTopics] = useState([]);

    const [photoArticles, setPhotoArticles] = useState(MOCK_PHOTO_ARTICLES);

    const [polls, setPolls] = useState([]);

    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchArticles(8).then(newArticles => setArticles(newArticles));
        fetchTopics(4).then(newTopics => setTopics(newTopics));
        fetchPolls(8).then(newPolls => setPolls(newPolls));
        fetchEvents(8).then(newEvents => setEvents(newEvents));
    }, []);

    const containerStyle = containerStyleSheet();
    const buttonStyle = {
        float: "right",
    }

    const topMargin = {
        marginTop: "55px",
    }

    const buttonShowAllTopicsStyle = {
        backgroundColor: "white",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        margin: "10px 5px",
        color: "black",
        border: "none"
    };

    const history = useHistory();
    const showAllTopics = () => { history.push(TOPICS); };

    const topicsContainer = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        background: "aliceblue"
    };

    return (
        <div style={topMargin}>
            <div style={topicsContainer}>
                <TopicList topics={topics} />
                <button type="submit" style={buttonShowAllTopicsStyle} className="btn btn-primary btn-block" onClick={showAllTopics}>
                    See all...
                </button>
            </div>
            <div style={containerStyle}>
                <h3 className="text-center">Articles</h3>
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
            <div style={containerStyle}>
                <h3 className="text-center">Events</h3>
                <EventList events={events} />
                <Link to={EVENTS}>
                    <button type="submit" className="btn btn-primary btn-block" style={buttonStyle}>
                        See all...
                    </button>
                </Link>
            </div>
            <div className="footer">
                <p>© 2021 Media, Inc</p>
            </div>
        </div>
    );
}

export { HomePage };