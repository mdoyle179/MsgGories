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
router.post("/sendMessage", (req, res) => {
    for (let i = 0; i < req.body.playersEmails.length; i++) {
        console.log(req.body.playersEmails[i]);
    }
    authorize(sendEmail, req.body.gameId, req.body.roundId, req.body.playersEmails, req.body.categories);
    console.log(req.body.gameId);
    res.send('sent message for ' + req.body.gameId);
});

// @desc Gets the emails from the players
router.get("/getMessages", (req, res) => {

    let oauth2client = "";
    readClientSecret()
        .then(clientSecretJson => {
            let clientSecret = JSON.parse(clientSecretJson);
            return gmailHelper.authorize(clientSecret);
        }).then(oauth2 => {
            oauth2client = oauth2
            return gmailHelper.getAllMessages(oauth2client);
        }).catch(error => {
            console.error(error);
        }).then(allEmails => {
            return gmailHelper.readEmails(oauth2client, allEmails, req.body.gameId, req.body.roundId, req.body.playerEmail);
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

function sendEmail(auth, roundNumber, gameId, playersEmails, categories) {
    let content = gmailHelper.createPlainTextMessage(categories);
    for (let i = 0; i < playersEmails.length; i++) {
        let email = gmailHelper.createEmail(content, roundNumber, gameId, playersEmails[i]);

        gmailHelper.sendEmail(auth, email);
    }
}

router.post('/sendPlayerMessages', (req, res) => {
    console.log("Seding player messages...")
    console.log(req.body.players);
    console.log(req.body.gameSessionID);
    console.log(req.body.currentRound);
    console.log(req.body.categories);
});

module.exports = router;
