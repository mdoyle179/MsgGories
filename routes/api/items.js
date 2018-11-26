const express = require("express");
const router = express.Router();

//Item Model
const Item = require("../../models/Item");
const GmailAuth = require("./gmailAuth");
const {google} = require('googleapis');
const gmailAuth = new GmailAuth();

const fs = require('fs');

// @route GET api/items
// @desc Get All Items
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 }) //sort desceding
    .then(items => res.json(items));
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
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.json(item));
});

// @route Delete api/items
// @desc Delete Item
router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ aggie: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// @route Sends the email to the players
// @desc Delete Item
router.get("/sendMessage", (req, res) => {
  console.log('in send message');
  // Load client secrets from a local file.
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Gmail API.
    gmailAuth.authorize(JSON.parse(content), listLabels);
  });
});

   /**
* Lists the labels in the user's account.
*
* @param {google.auth.OAuth2} auth An authorized OAuth2 client.
*/
function listLabels(auth) {
 console.log('in listlabels');
 const gmail = google.gmail({version: 'v1', auth});
 gmail.users.labels.list({
   userId: 'me',
 }, (err, res) => {
   if (err) return console.log('The API returned an error: ' + err);
   const labels = res.data.labels;
   if (labels.length) {
     console.log('Labels:');
     labels.forEach((label) => {
       console.log(`- ${label.name}`);
     });
   } else {
     console.log('No labels found.');
   }
 });
}

module.exports = router;
