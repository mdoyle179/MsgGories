const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const game = require("./routes/api/game");
const app = express();

//Body parser middleware
app.use(bodyParser.json());

//Db Config
const db = require("./config/keys").mongoURI;

//Connect to Mongo
// mongoose
//   .connect(db)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.use("/api/game", game);


app.listen(port, () => console.log("Server started on port " + port));