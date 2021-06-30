const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const isEmpty = require("is-empty");

const validateCreateArticleInput = require("../../validation/createArticle");
const validateGetArticlesByAuthorNameInput = require("../../validation/getArticlesByAuthorName");
const validateGetArticleByIdInput = require("../../validation/getArticleById");
const validateGetArticlesByTopicInput = require("../../validation/getArticlesByTopic");

const Article = require("../../models/Article");
const Topic = require("../../models/Topic");
const User = require("../../models/User");

router.post("/", (req, res) => {
    authorizationToken = req.headers["authorization"]
    jwt.verify(authorizationToken, "secret", (err, authData) => {
        if (err) {
            console.log(`Authorization with token ${authorizationToken} failed with error ${err}`)
            res.sendStatus(403);
        } else {
            const { errors, isValid } = validateCreateArticleInput(req.body);
            if (!isValid) {
                return res.status(400).json(errors);
            }

            var userId = authData.id

            User.findOne({ _id: userId }).then(user => {
                var authorName = user.name

                Article.findOne({ name: req.body.name, authorName: authorName }).then(article => {
                    if (article) {
                        return res.status(409).json({ article: "Article already exists" });
                    }

                    Topic.findOne({name: req.body.topic}).then(topic => {
                        if (!topic) { 
                            new Topic({
                                name: req.body.topic,
                                createdAt: Date.now()
                            }).save()
                                .catch(err => {
                                    console.log(err)
                                    return res.status(500).json({ error: "Internal server error" })})
                        }
                    })

                    new Article({
                        name: req.body.name,
                        authorName: authorName,
                        content: req.body.content,
                        topic: req.body.topic,
                        isPhotoArticle: req.body.isPhotoArticle,
                        createdAt: Date.now()
                    }).save()
                        .then(article => res.status(201).json(article))
                        .catch(err => {
                            console.log(err)
                            return res.status(500).json({ error: "Internal server error" })})
                });
            })
        }
    });
});

router.get("/authorName/:authorName", (req, res) => {
    const { errors, isValid } = validateGetArticlesByAuthorNameInput(req.params);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    var limit  = !isEmpty(req.query.limit) ? req.query.limit : 0;
    var isPhotoArticle  = !isEmpty(req.query.isPhotoArticle) ? req.query.isPhotoArticle : false;
    var limitNumber = parseInt(limit, 10);
    Article.find({ authorName: req.params.authorName,isPhotoArticle: isPhotoArticle}).sort({createdAt: -1}).limit(limitNumber).then(articles => {
        res.send(JSON.stringify(articles))
    });
});

router.get("/:id", (req, res) => {
    const { errors, isValid } = validateGetArticleByIdInput(req.params);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    Article.findOne({ _id: req.params.id }).then(article => {
        res.send(JSON.stringify(article))
    });
});

router.get("/topic/:topic", (req, res) => {
    const { errors, isValid } = validateGetArticlesByTopicInput(req.params);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    var limit  = !isEmpty(req.query.limit) ? req.query.limit : 0;
    var isPhotoArticle  = !isEmpty(req.query.isPhotoArticle) ? req.query.isPhotoArticle : false;
    var limitNumber = parseInt(limit, 10);
    Article.find({ topic: req.params.topic ,isPhotoArticle: isPhotoArticle}).sort({createdAt: -1}).limit(limitNumber).then(article => {
        res.send(JSON.stringify(article))
    });
});

router.get("/", (req, res) => {
    var limit  = !isEmpty(req.query.limit) ? req.query.limit : 0;
    var isPhotoArticle  = !isEmpty(req.query.isPhotoArticle) ? req.query.isPhotoArticle : false;
    var limitNumber = parseInt(limit, 10);
    Article.find({isPhotoArticle: isPhotoArticle}).sort({createdAt: -1}).limit(limitNumber).then(article => {
        res.send(JSON.stringify(article))
    });
});

router.get("/search/:keywords", (req, res) => {
    var limit  = !isEmpty(req.query.limit) ? req.query.limit : 0;
    var isPhotoArticle  = !isEmpty(req.query.isPhotoArticle) ? req.query.isPhotoArticle : false;
    var limitNumber = parseInt(limit, 10);

    if(req.params.keywords === "\"\""){
        Article.find({isPhotoArticle: isPhotoArticle}).sort({createdAt: -1}).limit(limitNumber).then(article => {
            res.send(JSON.stringify(article))
        });
    }else{
        Article.find({isPhotoArticle: isPhotoArticle,$text: {$search: req.params.keywords}}).sort({createdAt: -1}).limit(limitNumber).then(article => {
            res.send(JSON.stringify(article))
        });
    }
});

module.exports = router;
