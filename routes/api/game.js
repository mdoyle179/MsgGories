const express = require("express");
const router = express.Router();
const GmailHelper = require("../../models/gmailHelper");
const fs = require('fs');
const uuid = require("uuid");
const gmailHelper = new GmailHelper();


router.get("/players", (req, res) => {
    console.log("In players route")
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


// This uuid should be created when the start game is clicked
// generating it here for just testing
let uniqueId = uuid();

let playersEmails = ["msggories@gmail.com"];
let categories = ["Boy Names", "People", "Country", "Food"];

// @desc Sends the email to the players
router.get("/sendMessage", (req, res) => {
    // round id will also be passed here
    authorize(sendEmail, uniqueId, "1", playersEmails, categories);
});

// @desc Gets the emails from the players
router.get("/getMessages", (req, res) => {
    // round id will also be passed here
    authorize(readEmails, uniqueId, "1", playersEmails);
    console.log("in get messages");
});

function authorize(callback, gameId, roundNumber, playersEmails, categories) {
    // Load client secrets from a local file.
    fs.readFile('credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Gmail API.
        gmailHelper.authorize(JSON.parse(content), callback, gameId, roundNumber, playersEmails, categories);
    });
}

function sendEmail(auth, roundNumber, gameId, playersEmails, categories) {

    let content = gmailHelper.createPlainTextMessage(categories);
    for (let i = 0; i < playersEmails.length; i++) {
        let email = gmailHelper.createEmail(content, roundNumber, gameId, playersEmails[i]);

        gmailHelper.sendEmail(auth, email);
    }
}

function readEmails(auth, roundNumber, gameId, playersEmails) {
    gmailHelper.readEmails(auth, roundNumber, gameId, playersEmails);
}

module.exports = router;
