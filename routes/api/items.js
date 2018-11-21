const express = require("express");
const router = express.Router();
const {google} = require('googleapis');
const fs = require('fs');
const readline = require('readline');

//Item Model
const Item = require("../../models/Item");

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

router.get("/sendMessage", (req, res) => {

  console.log("sendMessage");
  
  // Imports the Google Cloud client library.
  const {Storage} = require('@google-cloud/storage');

  // Instantiates a client. If you don't specify credentials when constructing
  // the client, the client library will look for credentials in the
  // environment.
  const storage = new Storage();

  let response = runSample();
  console.log("response = " + response);
  // Makes an authenticated API request.
  // storage
  //   .getBuckets()
  //   .then((results) => {
  //     const buckets = results[0];

  //     console.log('Buckets:');
  //     buckets.forEach((bucket) => {
  //       console.log(bucket.name);
  //     });
  //   })
  //   .catch((err) => {
  //     console.error('ERROR:', err);
  //   });

});

async function runSample() {
  const auth1 = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/gmail.readonly']
  });
  
  const gmail = google.gmail({version: 'v1', auth: auth1});
  
  const response = await gmail.users.messages.list({userId: 'me'});
  console.log(res.data);
  return res.data;
}
module.exports = router;
