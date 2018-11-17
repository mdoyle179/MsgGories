const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const items = require("./routes/api/items");
const app = express();
require('dotenv').config();
const {google} = require('googleapis');

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

const GMAIL_CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const GMAIL_SECRET_ID = process.env.GMAIL_SECRET_ID;
const GMAIL_REDIRECT_URI = process.env.GMAIL_REDIRECT_URI;
const oAuth2Client = new google.auth.OAuth2(GMAIL_CLIENT_ID, GMAIL_SECRET_ID, GMAIL_REDIRECT_URI);
const gmail = google.gmail({
    version: 'v1', 
    oAuth2Client
});

// console.log(gmail);