const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const isEmpty = require("is-empty");

const validateCreatePollInput = require("../../validation/createPoll");
const validateGetPollByIdInput = require("../../validation/getPollById");
const validatePutPollByIdInput = require("../../validation/putPollById");
const validateGetPollsByAuthorNameInput = require("../../validation/getPollsByAuthorName");
const validateSearchPollsInput = require("../../validation/searchPolls");

const Poll = require("../../models/Poll");

router.post("/", (req, res) => {
    authorizationToken = req.headers["authorization"]
    jwt.verify(authorizationToken, "secret", (err, authData) => {
        if (err) {
            console.log(`Authorization with token ${authorizationToken} failed with error ${err}`)
            res.sendStatus(403);
        } else {
            const { errors, isValid } = validateCreatePollInput(req.body);
            if (!isValid) {
                return res.status(400).json(errors);
            }

            var userId = authData.id

            User.findOne({ _id: userId }).then(user => {
                var authorName = user.name

                Poll.findOne({ name: req.body.name, authorName: authorName }).then(poll => {
                    if (poll) {
                        return res.status(400).json({ error: "Poll already exists" });
                    }

                    answers = []
                    for (var index in req.body.answers) {
                        answers.push({name: req.body.answers[index],votes: 0})
                    }

                    console.log(answers)

                    new Poll({
                        name: req.body.name,
                        authorName: authorName,
                        answers: answers,
                        voters: [],
                        createdAt: Date.now()
                    }).save()
                        .then(poll => res.status(201).json(poll))
                        .catch(err => {
                            console.log(err)
                            return res.status(500).json({ error: "Internal server error" })});
                });
            })
        }
    });
});

router.get("/authorName/:authorName", (req, res) => {
    const { errors, isValid } = validateGetPollsByAuthorNameInput(req.params);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    var limit  = !isEmpty(req.query.limit) ? req.query.limit : 0;
    var limitNumber = parseInt(limit, 10);
    Poll.find({ authorName: req.params.authorName}).sort({createdAt: -1}).limit(limitNumber).then(polls => {
        res.send(JSON.stringify(polls))
    });
});

router.get("/:pollId", (req, res) => {
    const { errors, isValid } = validateGetPollByIdInput(req.params);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    Poll.findOne({ _id: req.params.pollId }).then(poll => {
        res.send(JSON.stringify(poll))
    });
});

router.put("/:pollId", (req, res) => {
    authorizationToken = req.headers["authorization"]
    jwt.verify(authorizationToken, "secret", (err, authData) => {
        if (err) {
            console.log(`Authorization with token ${authorizationToken} failed with error ${err}`)
            res.sendStatus(403);
        } else {
            var errors, isValid = validateGetPollByIdInput(req.params);
            if (!isValid) {
                return res.status(400).json(errors);
            }

            errors, isValid = validatePutPollByIdInput(req.body);
            if (!isValid) {
                return res.status(400).json(errors);
            }

            var userId = authData.id

            User.findOne({ _id: userId }).then(user => {
                var username = user.name

                Poll.findOne({ _id: req.params.pollId }).lean().then(poll => {
                    poll.voters  = !isEmpty(poll.voters) ? poll.voters : [];
                    for (var index in poll.voters) {
                        if (poll.voters[index] == username){
                            return res.status(409).json({ error: "You already voted in this poll" });
                        }
                    }

                    for (var index in poll.answers) {
                        if (poll.answers[index].name == req.body.answer){
                            poll.answers[index].votes=poll.answers[index].votes+1
                            poll.voters.push(username)
                            Poll.findOneAndUpdate({ _id: req.params.pollId}, poll,{upsert: false}, function(err, doc) {
                                if (err) return res.send(500, {error: err});
                                return res.status(200).json(poll);
                            });
                        }
                    }
                });
            });
        }
    });
});

router.get("/", (req, res) => {
    var limit  = !isEmpty(req.query.limit) ? req.query.limit : 0;
    var limitNumber = parseInt(limit, 10);
    Poll.find({}).sort({createdAt: -1}).limit(limitNumber).then(polls => {
        res.send(JSON.stringify(polls))
    });
});

router.get("/search/:keywords", (req, res) => {
    const { errors, isValid } = validateSearchPollsInput(req.params);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    var limit  = !isEmpty(req.query.limit) ? req.query.limit : 0;
    var limitNumber = parseInt(limit, 10);
    Poll.find({$text: {$search: req.params.keywords}}).sort({createdAt: -1}).limit(limitNumber).then(polls => {
        res.send(JSON.stringify(polls))
    });
});

module.exports = router;
