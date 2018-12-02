const readline = require('readline');
const {google} = require('googleapis');
const fs = require('fs');

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
  authorize(credentials, callback) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return this.getNewToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
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
    for (let i = 0; i < categories.length; i++){
      content += "<tr><td width='40%'>" + categories[i] + "</td><td width='60%'>__________</td></tr>";
    }
    return content;
  }
  createEmail(content){
    let userId = "me";
    let emailTo = "msggories@gmail.com";
    let subject = "test subject";

    let email = [
      "Content-Type: text/html; charset=\"UTF-8\"\n",
      "MIME-Version: 1.0\n",
      "Content-Transfer-Encoding: base64\n",
      "to: ", emailTo, "\n",
      "from: ", userId, "\n",
      "subject: ", subject, "\n\n",
      "<html><body>" +
          content +
      "</body></html>"
    ].join('');

    return email;
  }
  // put round number in sent message
  // use list https://developers.google.com/gmail/api/v1/reference/users/messages/list to get messages
}

module.exports = GmailHelper;