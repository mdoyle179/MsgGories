const express = require("express");
const router = express.Router();
const GmailHelper = require("../../models/gmailHelper");
const fs = require('fs');

const gmailHelper = new GmailHelper();

// @route GET api/items
// @desc Get All Items
router.get("/", (req, res) => {

});

router.get("/players", (req, res) => {
    var players = [];
    var player1 = { name: "Ag", score: 0 };
    var player2 = { name: "Matt", score: 0 };
    var player3 = { name: "Kenna", score: 0 };
    players.push(player1);
    players.push(player2);
    players.push(player3);
    res.json(players);
    console.log(players);
});

// @route POST api/items
// @desc Create Post
router.post("/", (req, res) => {

});

// @route Delete api/items
// @desc Delete Item
router.delete("/:id", (req, res) => {

});

// @desc Sends the email to the players
router.get("/sendMessage", (req, res) => {
    authorize(sendEmail);
});

// @desc Gets the emails from the players
router.get("/getMessages", (req, res) => {
    authorize(readEmails);
});

function authorize(callback) {
    // Load client secrets from a local file.
    fs.readFile('credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Gmail API.
        gmailHelper.authorize(JSON.parse(content), callback);
    });
}

function sendEmail(auth) {
    let categories = ["Boy Names", "People", "Country", "Food"];
    let content = gmailHelper.createContentTable(categories);
    let email = gmailHelper.createEmail(content)

    gmailHelper.sendEmail(auth, email);
}

function readEmails(auth) {
    gmailHelper.readEmails(auth);
}

module.exports = router;
