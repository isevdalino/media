import React, { useEffect, useState } from "react";
import ArticleList from '../articles/ArticleList';
import { containerStyleSheet } from '../articles/articlesStyles.js'
import PhotoArticleList from "../photo-articles/PhotoArticleList";
import { searchArticles,searchPolls,fetchArticlesByTopic ,fetchPollsByAuthorName,fetchArticlesByAuthorName,searchEvents,fetchEventsByAuthorName} from "../../server-requests/requests";
import PollList from "../polls/PollList";
import EventList from "../events/EventList";

function SearchResults() {
    const { search } = window.location;
    const searchByStringQuery = new URLSearchParams(search).get('s');
    const searchByTopicQuery = new URLSearchParams(search).get('t');
    const searchByAuthorNameQuery = new URLSearchParams(search).get('a');

    const [searchQuery, setSearchQuery] = useState(searchByStringQuery||searchByTopicQuery||searchByAuthorNameQuery);

    const [articles, setArticles] = useState([]);
    const [photoArticles, setPhotoArticles] = useState([]);
    const [polls, setPolls] = useState([]);
    const [events, setEvents] = useState([]);

    const containerStyle = containerStyleSheet();
    const topMargin = {
        marginTop: "55px",
    }

    useEffect(() => {
        var keywords = "\"\""
        if (searchQuery) {
            keywords = searchQuery
        } 
        
        if(searchByTopicQuery){
            fetchArticlesByTopic(0,keywords,false).then(newArticles => setArticles(newArticles));
            fetchArticlesByTopic(0,keywords,true).then(newPhotoArticles => setPhotoArticles(newPhotoArticles));
        }else if(searchByStringQuery){
            searchArticles(0,keywords,false).then(newArticles => setArticles(newArticles));
            searchArticles(0,keywords,true).then(newPhotoArticles => setPhotoArticles(newPhotoArticles));
            searchPolls(0,keywords).then(newPolls => setPolls(newPolls));
            searchEvents(0,keywords).then(newEvents => setEvents(newEvents));
        }
        else if(searchByAuthorNameQuery){
            fetchArticlesByAuthorName(0,keywords,false).then(newArticles => setArticles(newArticles));
            fetchArticlesByAuthorName(0,keywords,true).then(newPhotoArticles => setPhotoArticles(newPhotoArticles));
            fetchPollsByAuthorName(0,keywords).then(newPolls => setPolls(newPolls));
            fetchEventsByAuthorName(0,keywords).then(newEvents => setEvents(newEvents));
        }else{
            searchArticles(0,keywords,false).then(newArticles => setArticles(newArticles));
            searchArticles(0,keywords,true).then(newPhotoArticles => setPhotoArticles(newPhotoArticles));
            searchPolls(0,keywords).then(newPolls => setPolls(newPolls));
            searchEvents(0,keywords).then(newEvents => setEvents(newEvents));
        }
    }, []);


    if(searchByTopicQuery){
        return (
            <div style={topMargin}>
                <div style={containerStyle}>
                    <h3 className="text-center">Articles</h3>
                    <ArticleList articles={articles} />
                </div>
                <div style={containerStyle}>
                    <h3 className="text-center">Gallery</h3>
                    <PhotoArticleList photoArticles={photoArticles} />
                </div>
            </div>
        );
    }

    return (
        <div style={topMargin}>
            <div style={containerStyle}>
                <h3 className="text-center">Articles</h3>
                <ArticleList articles={articles} />
            </div>
            <div style={containerStyle}>
                <h3 className="text-center">Gallery</h3>
                <PhotoArticleList photoArticles={photoArticles} />
            </div>
            <div style={containerStyle}>
                <h3 className="text-center">Polls</h3>
                <PollList polls={polls} />
            </div>
            <div style={containerStyle}>
                <h3 className="text-center">Events</h3>
                <EventList events={events} />
            </div>
        </div>
    );
}

export { SearchResults };