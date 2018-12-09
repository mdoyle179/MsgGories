const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
const uuidv4 = require('uuid/v4');

//id, name, score 
const PlayerSchema = new Schema({
  _id: {
     type: ObjectId, 
     default: uuidv4 
    },
  name: {
      type: String,
      default: ""
    },
    email: {
      type: Schema.Types.String,
      default: "donny.t@whitehouse.gov"   
    },
    score: {
      type: Schema.Types.Number
      
    }

  });

  var Player = mongoose.model("Player", PlayerSchema,"Players");
  module.exports = Player;