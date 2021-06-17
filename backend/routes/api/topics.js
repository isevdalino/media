const express = require("express");
const router = express.Router();
const isEmpty = require("is-empty");

const Topic = require("../../models/Topic");

router.get("/", (req, res) => {
    var limit  = !isEmpty(req.query.limit) ? req.query.limit : 0;
    var limitNumber = parseInt(limit, 10);
    Topic.find({}).sort({createdAt: -1}).limit(limitNumber).then(topic => {
        res.send(JSON.stringify(topic))
    });
});

module.exports = router;
