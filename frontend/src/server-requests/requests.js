import { SERVER_ADDRESS } from "../constants/Paths";
import { Article } from "../models/article";
import { Topic } from "../models/topic";
import { Poll } from "../models/poll";
import { USER_LOGIN_TOKEN_LOCAL_STORAGE_KEY,USER_EMAIL_LOCAL_STORAGE_KEY } from "../constants/constants";
import { Comment } from "../models/comment";
import { Event } from "../models/event";

function login(email,password){
    const body = JSON.stringify({ email: email, password: password});

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
    };

    return fetch(SERVER_ADDRESS + "users/login", requestOptions)
}

function fetchArticles(limit,fetchPhotoArticles) {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(SERVER_ADDRESS + `articles?limit=${limit}&isPhotoArticle=${fetchPhotoArticles}`, requestOptions)
        .then(response => response.json())
        .then(data =>
            data.map(article =>
                new Article(article._id, article.name, article.authorName, article.content, article.topic, article.createdAt)
            )
        );
};

function searchArticles(limit,keywords,fetchPhotoArticles) {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(SERVER_ADDRESS + `articles/search/${keywords}?limit=${limit}&isPhotoArticle=${fetchPhotoArticles}`, requestOptions)
        .then(response => response.json())
        .then(data =>
            data.map(article =>
                new Article(article._id, article.name, article.authorName, article.content, article.topic, article.createdAt)
            )
        );
};

function fetchArticlesByTopic(limit,topic,fetchPhotoArticles) {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(SERVER_ADDRESS + `articles/topic/${topic}?limit=${limit}&isPhotoArticle=${fetchPhotoArticles}`, requestOptions)
        .then(response => response.json())
        .then(data =>
            data.map(article =>
                new Article(article._id, article.name, article.authorName, article.content, article.topic, article.createdAt)
            )
        );
};

function fetchArticlesByAuthorName(limit,authorName,fetchPhotoArticles) {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(SERVER_ADDRESS + `articles/authorName/${authorName}?limit=${limit}&isPhotoArticle=${fetchPhotoArticles}`, requestOptions)
        .then(response => response.json())
        .then(data =>
            data.map(article =>
                new Article(article._id, article.name, article.authorName, article.content, article.topic, article.createdAt)
            )
        );
};

function fetchArticle(id,isPhotoArticle) {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(SERVER_ADDRESS + `articles/${id}?isPhotoArticle=${isPhotoArticle}`, requestOptions)
        .then(response => response.json())
        .then(article =>
                new Article(article._id, article.name, article.authorName, article.content, article.topic, article.createdAt)
        );
};

function postArticle(name,topic,content,isPhotoArticle){
    const body = JSON.stringify({ name: name, topic: topic, content: content,isPhotoArticle: isPhotoArticle});
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

function searchEvents(limit,keywords) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(SERVER_ADDRESS + `events/search/${keywords}?limit=${limit}`, requestOptions)
        .then(response => response.json())
        .then(data =>
            data.map(event =>
                new Event(event._id, event.name, event.authorName, event.description, event.createdAt)
            )
        );
}

function fetchEventsByAuthorName(limit,authorName) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(SERVER_ADDRESS + `events/authorName/${authorName}?limit=${limit}`, requestOptions)
        .then(response => response.json())
        .then(data =>
            data.map(event =>
                new Event(event._id, event.name, event.authorName, event.description, event.createdAt)
            )
        );
}

function searchPolls(limit,keywords) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(SERVER_ADDRESS +`polls/search/${keywords}?limit=${limit}`, requestOptions)
        .then(response => response.json())
        .then(data =>
            data.map(poll =>
                new Poll(poll._id, poll.name, poll.authorNames, poll.answers)
            )
        );
}

function fetchPollsByAuthorName(limit,authorName) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(SERVER_ADDRESS +`polls/authorName/${authorName}?limit=${limit}`, requestOptions)
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
            new Poll(data._id, data.name, data.authorName, data.answers, data.voters, data.createdAt)
        );
}

function hasUserVotedInPoll(id) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(SERVER_ADDRESS + `polls/${id}/hasVoted/${localStorage.getItem(USER_EMAIL_LOCAL_STORAGE_KEY)}`, requestOptions)
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

function fetchNumRating(articleId) {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(SERVER_ADDRESS + `ratings/${articleId}/numRatings`, requestOptions)
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

function resetPassword(email) {
    const body = JSON.stringify({ email: email });

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
    };

    return fetch(SERVER_ADDRESS + "users/resetPassword", requestOptions)
}

export {
    fetchArticles, fetchTopics, fetchPolls, fetchPoll, putPoll, postPoll, postRating, fetchRating,
    fetchComments, postComment,postArticle,fetchArticle,searchArticles,searchPolls,fetchArticlesByTopic,fetchArticlesByAuthorName,fetchPollsByAuthorName,resetPassword,postEvent, fetchEvents, fetchEvent,searchEvents,fetchEventsByAuthorName,login,hasUserVotedInPoll,fetchNumRating
};