const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const items = require("./routes/api/items");
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

app.use("/api/items", items);

app.listen(port, () => console.log("Server started on port " + port));
