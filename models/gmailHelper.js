const readline = require('readline');
const { google } = require('googleapis');
const fs = require('fs');
const Base64 = require('js-base64').Base64;
const parseMessage = require('gmail-api-parse-message');
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/gmail.send', 'https://www.googleapis.com/auth/gmail.compose'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';
const DELIMITER = ":::";

class GmailHelper {

    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
    authorize(credentials) {
        const { client_secret, client_id, redirect_uris } = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);

        return new Promise((resolve, reject) => {
            // Check if we have previously stored a token.
            fs.readFile(TOKEN_PATH, (err, token) => {
                if (err) resolve(this.getNewToken(oAuth2Client));
                oAuth2Client.setCredentials(JSON.parse(token));
                resolve(oAuth2Client);
            });
        })
    }

    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
     */
    getNewToken(oAuth2Client) {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        return new Promise((resolve, reject) => {
            rl.question('Enter the code from that page here: ', (code) => {
                rl.close();
                oAuth2Client.getToken(code, (err, token) => {
                    if (err) return console.error('Error retrieving access token', err);
                    oAuth2Client.setCredentials(token);
                    // Store the token to disk for later program executions
                    fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                        if (err) return console.error(err);
                        console.log('Token stored to', TOKEN_PATH);
                    });
                    return resolve(oAuth2Client);
                });
            });
        });
    }

    createPlainTextMessage(categories) {
        let content = "Enter your response on each line after the 3 colons\n";

        for (let i = 0; i < categories.length; i++) {
            content += categories[i] + DELIMITER + "\n";
        }
        return content;
    }

    createEmail(content, gameId, roundNumber, playerEmail) {
        let userId = "me";
        let subject = this.createSubject(gameId, roundNumber, false);

        let email = [
            "Content-Type: text/plain; charset=\"UTF-8\"\n",
            "MIME-Version: 1.0\n",
            "Content-Transfer-Encoding: base64\n",
            "To: ", playerEmail, "\n",
            "From: ", userId, "\n",
            "Subject: ", subject, "\n\n",
            content
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
        // let subject = this.createSubject("306cc944-1a6a-43ab-98d5-bc881160d286", roundNumber, true);

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
                                console.log(JSON.stringify(playersThatResponded));
                            }
                        }
                    });
                }
                return playersThatResponded;
            }
        });
    }

    getPlayerResponse(response, replySubject, playersEmails) {
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

        // See if the subject matches the one we are looking for
        if (subject === replySubject) {
            // console.log("Found a reply subject = " + subject);

            // See if it matches the players email
            if (playersEmails.indexOf(from)) {
                // console.log("Found the person = " + from);
            }
            objectToReturn.playerEmail = from;

            objectToReturn.responses = this.parseAnswers(response);
        }

        return objectToReturn;
    }

    parseAnswers(messageContent) {
        let parsedMessage = parseMessage(messageContent);
        let plainTextMsg = parsedMessage.textPlain;
        let messageLines = plainTextMsg.split("\n");

        let userResponses = [];
        for (let i = 0; i < messageLines.length; i++) {
            let lineParts = messageLines[i].split(DELIMITER);
            if (lineParts[0] && lineParts[1]) {
                let reArrow = /> /;
                let reR = /\r/;
                let question = lineParts[0].replace(reArrow, "");
                let answer = lineParts[1].replace(reR, "");

                let userResponse = {
                    "question": question,
                    "answer": answer
                }
                userResponses.push(userResponse);
            }
        }

        return userResponses;
    }
}

module.exports = GmailHelper;