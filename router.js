const express = require("express");
const router = express.Router();
const URL = require("../MODELS/modelurl");
const { 
    handleAndShortUrl,
    handleAndRedirectUrl,
    handleAndDisplayAnalytics
} = require("../CONTROLLERS/urlcontrollerfunc");


router
.route("/")
.get((req, res) => res.send("it's the home page buddy"));

router
.route("/shorten")
.post(handleAndShortUrl);

router
.route("/:shortId")
.get(handleAndRedirectUrl);

router
.route("/analytics/:shortId")
.get(handleAndDisplayAnalytics);


module.exports = router;