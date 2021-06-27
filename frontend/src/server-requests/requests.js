import { SERVER_ADDRESS } from "../constants/Paths";
import { Article } from "../models/article";
import { Topic } from "../models/topic";
import { Poll } from "../models/poll";
import { USER_LOGIN_TOKEN_LOCAL_STORAGE_KEY } from "../constants/constants";

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
                new Poll(poll._id, poll.name, poll.authorNames, poll.answers)
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
            new Poll(data._id, data.name, data.authorName, data.answers, data.voters)
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
        .then(response => response.json())
        .then(data =>
            data
        );
}

function postPoll(name, answers) {
    const body = JSON.stringify({ name: name, answers: answers });

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem(USER_LOGIN_TOKEN_LOCAL_STORAGE_KEY) },
        body: body
    };

    return fetch(SERVER_ADDRESS + "polls", requestOptions)
        .then(response => response.json())
        .then(data =>
            data
        );
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
        .then(response => response.json())
        .then(data =>
            data
        );
}

function fetchComments(articleId) {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(SERVER_ADDRESS + "comments/" + articleId, requestOptions)
        .then(response => response.json());
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
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data;
        })
}

export {
    fetchArticles, fetchTopics, fetchPolls, fetchPoll, putPoll, postPoll, postRating, fetchRating,
    fetchComments, postComment
};