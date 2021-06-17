const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const validateRateArticleInput = require("../../validation/rateArticle");
const validateGetRatingByArticleIdInput = require("../../validation/getRatingByArticleId");

const Rating = require("../../models/Rating");

router.post("/:articleId", (req, res) => {
    authorizationToken = req.headers["authorization"]
    jwt.verify(authorizationToken, "secret", (err, authData) => {
        if (err) {
            console.log(`Authorization with token ${authorizationToken} failed with error ${err}`)
            res.sendStatus(403);
        } else {
            const { errors, isValid } = validateRateArticleInput(req.params,req.body);
            if (!isValid) {
                return res.status(400).json(errors);
            }

            var userId = authData.id
            User.findOne({ _id: userId }).then(user => {
                var username = user.name
                Rating.findOne({ articleId: req.params.articleId, username: username }).then(rating => {
                    if (rating) {
                        rating.rating = req.body.rating
                        Rating.findOneAndUpdate({articleId: req.params.articleId, username: username}, rating,{upsert: false}, function(err, doc) {
                            if (err) return res.send(500, {error: err});
                            return res.status(200).json(rating);
                        });
                    }else{
                        new Rating({
                            articleId: req.params.articleId,
                            username: username,
                            rating: req.body.rating,
                            createdAt: Date.now()
                        }).save()
                            .then(rating => res.status(201).json(rating))
                            .catch(err => {
                                console.log(err)
                                return res.status(500).json({ error: "Internal server error" })});
                    }
                });
            });
        }
    });
});

router.get("/:articleId", (req, res) => {
    const { errors, isValid } = validateGetRatingByArticleIdInput(req.params);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    Rating.find({ articleId: req.params.articleId }).then(ratings => {
        if (ratings.length != 0 ){
            var sumOfRatings = 0
            for (var index in ratings) {
                sumOfRatings += ratings[index].rating
            }
    
            var ratingNumber = sumOfRatings / ratings.length
    
            var rating = {articleId: req.params.articleId, rating: ratingNumber}
            res.send(JSON.stringify(rating))
        }else{
            var rating = {articleId: req.params.articleId, rating: 0}
            res.send(JSON.stringify(rating))
        }
    });
});

module.exports = router;
