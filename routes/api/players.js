var mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const Player = require("../../models/Player.js");
//players
//id, name, score 
// @route POST api/items
// @desc Create Post
router.post("/", (req, res) => {
  const newplayer = new Player({
    _id: req.body.id,
    name: req.body.name,
    score: req.body.score,
    email: req.body.email
  });

  newplayer.save().then(player => res.json(player));
});

router.get("/:_id", (req, res) => {
  Player.findById(req.params.id)
    .then(player => res.json(player));
});

router.get("/", (req, res) => {
  Player.find({}).lean().exec(function (err, players) {
    var thePlayers = [];
    players = players.map(function (v) {
      console.log(v);
      thePlayers.push(v);
    });
    console.log(thePlayers);
    res.send(thePlayers);

  });
});

router.get("/?name=", function (req, res) {
  Player.find({ name: 'name' }, function (err, player) {
    if (err)
      res.send(err);

    res.json(player);
  });
});

router.delete("/:_id", (req, res) => {
  Player.findById(req.params.id)
    .then(player => player.remove().then(() => res.json(player)))
    .catch(err => res.status(404).json({ success: false }));
});

router.put("/", (req, res) => {
  var query = {'_id':req.body._id};
  Player.findOneAndUpdate(query, req.body, {upsert:true}, function(err, doc){
      if (err) return res.send(500, { error: err });
      return res.send("succesfully saved");
  });
});

module.exports = router;
