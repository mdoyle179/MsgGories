const express = require("express");
const router = express.Router();
const GmailAuth = require("./gmailAuth");
const {google} = require('googleapis');
const Base64 = require('js-base64').Base64;
const fs = require('fs');

const gmailAuth = new GmailAuth();

// @route GET api/items
// @desc Get All Items
router.get("/", (req, res) => {

});

router.get("/players", (req, res) => {
  var players = [];
  var player1 = {name:"Ag", score:0};
  var player2= {name:"Matt", score:0};
  var player3 = {name:"Kenna", score:0};
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

// @route Sends the email to the players
// @desc Delete Item
router.get("/sendMessage", (req, res) => {
  console.log('in send message');
  // Load client secrets from a local file.
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Gmail API.
    gmailAuth.authorize(JSON.parse(content), sendEmail);
  });
});

function sendEmail(auth) {
  let userId = "me";
  let emailTo = "msggories@gmail.com";
  let subject = "test subject";
  let email = ["Content-Type: text/plain; charset=\"UTF-8\"\n",
    "MIME-Version: 1.0\n",
    "Content-Transfer-Encoding: 7bit\n",
    "to: ", emailTo, "\n",
    "from: ", userId, "\n",
    "subject: ", subject, "\n\n",
    "content of body"
  ].join('');

  const gmail = google.gmail({version: 'v1', auth});
  let base64EncodedEmail = Base64.encodeURI(email);

  gmail.users.messages.send({
    'userId': userId,
    'resource': {
      'raw': base64EncodedEmail
    }
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    else {
      console.log("Sent message");
    }
  });
}

module.exports = router;
