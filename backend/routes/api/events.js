const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const isEmpty = require("is-empty");

const validateCreateEventInput = require("../../validation/createEvent");
const validateGetEventsByAuthorNameInput = require("../../validation/getEventsByAuthorName");
const validateGetEventByIdInput = require("../../validation/getEventById");
const validateSearchEventsInput = require("../../validation/searchEvents");

const Event = require("../../models/Event");

router.post("/", (req, res) => {
    authorizationToken = req.headers["authorization"]
    jwt.verify(authorizationToken, "secret", (err, authData) => {
        if (err) {
            console.log(`Authorization with token ${authorizationToken} failed with error ${err}`)
            res.sendStatus(403);
        } else {
            const { errors, isValid } = validateCreateEventInput(req.body);
            if (!isValid) {
                return res.status(400).json(errors);
            }

            var userId = authData.id

            User.findOne({ _id: userId }).then(user => {
                var authorName = user.name

                Event.findOne({ name: req.body.name, authorName: authorName }).then(event => {
                    if (event) {
                        return res.status(400).json({ error: "Event already exists" });
                    }

                    new Event({
                        name: req.body.name,
                        authorName: authorName,
                        description: req.body.description,
                        createdAt: Date.now()
                    }).save()
                        .then(event => res.status(201).json(event))
                        .catch(err => {
                            console.log(err)
                            return res.status(500).json({ error: "Internal server error" })});
                });
            })
        }
    });
});

router.get("/authorName/:authorName", (req, res) => {
    const { errors, isValid } = validateGetEventsByAuthorNameInput(req.params);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    var limit  = !isEmpty(req.query.limit) ? req.query.limit : 0;
    var limitNumber = parseInt(limit, 10);
    Event.find({ authorName: req.params.authorName}).sort({createdAt: -1}).limit(limitNumber).then(events => {
        res.send(JSON.stringify(events))
    });
});

router.get("/:id", (req, res) => {
    const { errors, isValid } = validateGetEventByIdInput(req.params);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    Event.findOne({ _id: req.params.id }).then(event => {
        res.send(JSON.stringify(event))
    });
});

router.get("/", (req, res) => {
    var limit  = !isEmpty(req.query.limit) ? req.query.limit : 0;
    var limitNumber = parseInt(limit, 10);
    Event.find({}).sort({createdAt: -1}).limit(limitNumber).then(events => {
        res.send(JSON.stringify(events))
    });
});

router.get("/search/:keywords", (req, res) => {
    const { errors, isValid } = validateSearchEventsInput(req.params);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    var limit  = !isEmpty(req.query.limit) ? req.query.limit : 0;
    var limitNumber = parseInt(limit, 10);
    Event.find({$text: {$search: req.params.keywords}}).sort({createdAt: -1}).limit(limitNumber).then(events => {
        res.send(JSON.stringify(events))
    });
});

module.exports = router;
