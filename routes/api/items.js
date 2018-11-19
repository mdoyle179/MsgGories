const express = require("express");
const router = express.Router();

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

module.exports = router;
