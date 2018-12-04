const readline = require('readline');
const { google } = require('googleapis');
const fs = require('fs');
const Base64 = require('js-base64').Base64;

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/gmail.send', 'https://www.googleapis.com/auth/gmail.compose'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

class GmailHelper {
    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
    authorize(credentials, callback, gameId, roundNumber, playersEmails) {
        const { client_secret, client_id, redirect_uris } = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);

        // Check if we have previously stored a token.
        fs.readFile(TOKEN_PATH, (err, token) => {
            if (err) return this.getNewToken(oAuth2Client, callback);
            oAuth2Client.setCredentials(JSON.parse(token));
            callback(oAuth2Client, gameId, roundNumber, playersEmails);
        });
    }

    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback for the authorized client.
     */
    getNewToken(oAuth2Client, callback) {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question('Enter the code from that page here: ', (code) => {
            rl.close();
            oAuth2Client.getToken(code, (err, token) => {
                if (err) return console.error('Error retrieving access token', err);
                oAuth2Client.setCredentials(token);
                // Store the token to disk for later program executions
                console.log('about to write to token.json file');
                fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                    if (err) return console.error(err);
                    console.log('Token stored to', TOKEN_PATH);
                });
                callback(oAuth2Client);
            });
        });
    }
    createContentTable(categories) {
        let content = "";
        content += "<html><body>";
        content += "<table width='100%'><tr><td>"; // Outer table
        content += "<table width='60%'>"; // Nested table

        // content += "<tr><td width='70%'>So is this</td><td width='30%'>9999</td></tr>";
        content += "</table>";
        content += "</td></tr></table>";
        content += "</body></html>";
        for (let i = 0; i < categories.length; i++) {
            content += "<tr><td width='40%'>" + categories[i] + "</td><td width='60%'>__________</td></tr>";
        }
        return content;
    }
    createEmail(content, gameId, roundNumber, playerEmail) {
        let userId = "me";
        let subject = this.createSubject(gameId, roundNumber, false);

        let email = [
            "Content-Type: text/html; charset=\"UTF-8\"\n",
            "MIME-Version: 1.0\n",
            "Content-Transfer-Encoding: base64\n",
            "To: ", playerEmail, "\n",
            "From: ", userId, "\n",
            "Subject: ", subject, "\n\n",
            "<html><body>" +
            content +
            "</body></html>"
        ].join('');

        let base64EncodedEmail = Base64.encodeURI(email);
        return base64EncodedEmail;
    }

    sendEmail(auth, email) {
        const gmail = google.gmail({ version: 'v1', auth });
        let userId = "me";

        gmail.users.messages.send({
            'userId': userId,
            'resource': {
                'raw': email
            }
        }, (err, res) => {
            if (err) return console.log('The API returned an error while sending the email: ' + err);
            else {
                console.log("Sent message");
            }
        });
    }

    createSubject(gameId, roundNumber, isReply) {
        let subject = "MsgGories-" + gameId + "-" + roundNumber;
        if (isReply) {
            subject = "Re: " + subject;
        }
        return subject;
    }

    readEmails(auth, gameId, roundNumber, playersEmails) {
        const gmail = google.gmail({ version: 'v1', auth });
        let userId = "me";
        let subject = this.createSubject(gameId, roundNumber, true);
        let playersThatResponded = [];

        // Get all messages in the inbox
        gmail.users.messages.list({
            'userId': userId,
        }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            else {
                let messages = res.data.messages;

                for (let i = 0; i < messages.length; i++) {
                    // Get the actual message objects
                    gmail.users.messages.get({
                        'userId': userId,
                        'id': messages[i].id
                    }, (err, res) => {
                        if (err) return console.log('The API returned an error: ' + err);
                        else {
                            let playerResponse = this.getPlayerResponse(res.data, subject, playersEmails);
                            if (Object.keys(playerResponse).length > 0) {
                                playersThatResponded.push(playerResponse);
                                console.log("player email = " + playerResponse.playerEmail);
                                console.log("message content = " + playerResponse.messageContent);
                            }
                        }
                    });
                }
            }
        });
    }

    getPlayerResponse(response, replySubject, playersEmails) {
        // console.log('in isplayerresponse');
        let objectToReturn = {};
        let headers = response.payload.headers;
        let subject = "";
        let from = "";

        for (let j = 0; j < headers.length; j++) {
            // Get the subject
            if (headers[j].name.toUpperCase() === "SUBJECT") {
                subject = headers[j].value;
            }
            // Get who the email is from
            else if (headers[j].name.toUpperCase() === "FROM") {
                from = headers[j].value;
            }
        }
        // console.log("subject = " + subject);
        // console.log("from = " + from);

        // See if the subject matches the one we are looking for
        if (subject === replySubject) {
            console.log("Found a reply subject = " + subject);

            // See if it matches the players email
            if (playersEmails.indexOf(from)) {
                console.log("Found the person = " + from);
            }
            objectToReturn.playerEmail = from;
            objectToReturn.messageContent = response.snippet;
        }

        return objectToReturn;
    }
}

module.exports = GmailHelper;