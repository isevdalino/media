const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const isEmpty = require("is-empty");

const validateCommentArticleInput = require("../../validation/commentArticle");
const validateGetCommentsByArticleIdInput = require("../../validation/getCommentsByArticleId");

const Comment = require("../../models/Comment");

router.post("/:articleId", (req, res) => {
    authorizationToken = req.headers["authorization"]
    jwt.verify(authorizationToken, "secret", (err, authData) => {
        if (err) {
            console.log(`Authorization with token ${authorizationToken} failed with error ${err}`)
            res.sendStatus(403);
        } else {
            const { errors, isValid } = validateCommentArticleInput(req.params,req.body);
            if (!isValid) {
                return res.status(400).json(errors);
            }
            
            var userId = authData.id

            User.findOne({ _id: userId }).then(user => {
                var username = user.name

                new Comment({
                    articleId: req.params.articleId,
                    username: username,
                    comment: req.body.comment,
                    createdAt: Date.now()
                }).save()
                    .then(rating => res.status(201).json(rating))
                    .catch(err => {
                        console.log(err)
                        return res.status(500).json({ error: "Internal server error" })});
            });
        }
    });
});

router.get("/:articleId", (req, res) => {
    const { errors, isValid } = validateGetCommentsByArticleIdInput(req.params);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    var limit  = !isEmpty(req.query.limit) ? req.query.limit : 0;
    var limitNumber = parseInt(limit, 10);
    Comment.find({ articleId: req.params.articleId }).sort({createdAt: -1}).limit(limitNumber).then(comments => {
        res.send(JSON.stringify(comments))
    });
});

module.exports = router;
