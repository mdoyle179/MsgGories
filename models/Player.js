const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;
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
      default: "defaultEmail@email.com"   
    },
  score: {
     type: Schema.Types.Number      
    },
    host: {
      type: Schema.Types.Boolean,
      default: false   
    },

  });

 var Player = mongoose.model("Player", PlayerSchema,"Players");
 module.exports = Player;