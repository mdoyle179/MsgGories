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
