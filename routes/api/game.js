const express = require("express");
const router = express.Router();
const GmailHelper = require("../../models/gmailHelper");
const fs = require('fs');
const gmailHelper = new GmailHelper();

router.get("/players", (req, res) => {
    console.log("In players route")
    var players = [];
    var player1 = { name: "Ag", email: "agdel.m.irlanda", score: 0 };
    var player2 = { name: "Matt", email: "mdoyle@gmail.com", score: 0 };
    var player3 = { name: "Kenna", email: "kb", score: 0 };
    players.push(player1);
    players.push(player2);
    players.push(player3);
    res.json(players);
    console.log(players);
});

// @desc Sends the email to the players
router.post("/sendPlayerMessages", (req, res) => {
    console.log(req.body.categories);
    let oauth2client = "";
    readClientSecret()
        .then(clientSecretJson => {
            let clientSecret = JSON.parse(clientSecretJson);
            return gmailHelper.authorize(clientSecret);
        }).then(oauth2 => {
            oauth2client = oauth2;
            let content = gmailHelper.createPlainTextMessage(req.body.categories, req.body.letter);

            for (let i = 0; i < req.body.players.length; i++) {
                let email = gmailHelper.createEmail(content, req.body.gameSessionID, req.body.currentRound, req.body.players[i].email);
                gmailHelper.sendEmail(oauth2client, email);
            }
            console.log(req.body.gameSessionID);
            res.send('sent message for ' + req.body.gameSessionID);
        }).catch(error => {
            console.error(error);
        });
});

// @desc Gets the emails from the players
router.get("/getMessages", (req, res) => {
    console.log("Getting resposes");
    let oauth2client = "";
    readClientSecret()
        .then(clientSecretJson => {
            let clientSecret = JSON.parse(clientSecretJson);
            return gmailHelper.authorize(clientSecret);
        }).then(oauth2 => {
            oauth2client = oauth2;
            return gmailHelper.getAllMessages(oauth2client);
        }).catch(error => {
            console.error(error);
        }).then(allEmails => {
            return gmailHelper.readEmails(oauth2client, allEmails, req.body.gameSessionID, req.body.currentRound, req.body.playerEmail);
        }).then(playerThatResponded => {
            console.log(JSON.stringify(playerThatResponded));
            res.send(playerThatResponded);
        });
});

function readClientSecret() {
    // Load client secrets from a local file.
    return new Promise((resolve, reject) => {
        fs.readFile('credentials.json', (err, content) => {
            if (err) return console.log('Error loading client secret file:', err);
            return resolve(content);
        });
    })
}

module.exports = router;
