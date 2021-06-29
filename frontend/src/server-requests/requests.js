import { SERVER_ADDRESS } from "../constants/Paths";
import { Article } from "../models/article";
import { Topic } from "../models/topic";
import { Poll } from "../models/poll";
import { USER_LOGIN_TOKEN_LOCAL_STORAGE_KEY } from "../constants/constants";
import { Comment } from "../models/comment";
import { Event } from "../models/event";

function fetchArticles(limit) {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(SERVER_ADDRESS + "articles?limit=" + limit, requestOptions)
        .then(response => response.json())
        .then(data =>
            data.map(article =>
                new Article(article._id, article.name, article.authorName, article.content, article.topic)
            )
        );
};

function postArticle(name, topic, content) {
    const body = JSON.stringify({ name: name, topic: topic, content: content });

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem(USER_LOGIN_TOKEN_LOCAL_STORAGE_KEY) },
        body: body
    };

    return fetch(SERVER_ADDRESS + "articles", requestOptions);
};

function postEvent(eventName, eventDescription) {
    const body = JSON.stringify({ name: eventName, description: eventDescription });

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem(USER_LOGIN_TOKEN_LOCAL_STORAGE_KEY) },
        body: body
    };

    return fetch(SERVER_ADDRESS + "events", requestOptions);
};

function fetchTopics(limit) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(SERVER_ADDRESS + "topics?limit=" + limit, requestOptions)
        .then(response => response.json())
        .then(data =>
            data.map(topic =>
                new Topic(topic._id, topic.name)
            )
        );
}

function fetchPolls(limit) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(SERVER_ADDRESS + "polls?limit=" + limit, requestOptions)
        .then(response => response.json())
        .then(data =>
            data.map(poll =>
                new Poll(poll._id, poll.name, poll.authorName, poll.answers)
            )
        );
}

function fetchEvents(limit) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(SERVER_ADDRESS + "events?limit=" + limit, requestOptions)
        .then(response => response.json())
        .then(data =>
            data.map(event =>
                new Event(event._id, event.name, event.authorName, event.description, event.createdAt)
            )
        );
}

function fetchPoll(id) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(SERVER_ADDRESS + "polls/" + id, requestOptions)
        .then(response => response.json())
        .then(data =>
            new Poll(data._id, data.name, data.authorName, data.answers, data.voters, data.createdAt)
        );
}

function fetchEvent(id) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(SERVER_ADDRESS + "events/" + id, requestOptions)
        .then(response => response.json())
        .then(data =>
            new Event(data._id, data.name, data.authorName, data.description, data.createdAt)
        );
}

function putPoll(id, answer) {
    const body = JSON.stringify({ answer: answer });

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem(USER_LOGIN_TOKEN_LOCAL_STORAGE_KEY) },
        body: body
    };

    return fetch(SERVER_ADDRESS + "polls/" + id, requestOptions)
}

function postPoll(name, answers) {
    const body = JSON.stringify({ name: name, answers: answers });
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem(USER_LOGIN_TOKEN_LOCAL_STORAGE_KEY) },
        body: body
    };

    return fetch(SERVER_ADDRESS + "polls", requestOptions)
}

function fetchRating(articleId) {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(SERVER_ADDRESS + "ratings/" + articleId, requestOptions)
        .then(response => response.json());
}

function postRating(articleId, newRating) {
    const body = JSON.stringify({ rating: newRating });

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem(USER_LOGIN_TOKEN_LOCAL_STORAGE_KEY) },
        body: body
    };

    return fetch(SERVER_ADDRESS + "ratings/" + articleId, requestOptions)
}

function fetchComments(articleId, limit) {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(SERVER_ADDRESS + "comments/" + articleId + "?limit=" + limit, requestOptions)
        .then(response => response.json())
        .then(data =>
            data.map(comment =>
                new Comment(comment._id, comment.username, comment.comment, comment.createdAt)
            )
        );
}

function postComment(articleId, comment) {
    const body = JSON.stringify({ comment: comment });
    console.log("articleId: " + articleId + ", comment: " + comment);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem(USER_LOGIN_TOKEN_LOCAL_STORAGE_KEY) },
        body: body
    };

    return fetch(SERVER_ADDRESS + "comments/" + articleId, requestOptions)
}

export {
    fetchArticles, fetchTopics, fetchPolls, fetchPoll, putPoll, postPoll, postRating, fetchRating,
    fetchComments, postComment, postArticle, postEvent, fetchEvents, fetchEvent
};