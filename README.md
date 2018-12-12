# MsgGories
A fun and easy way to play scattegories on your phone!

Initial Setup:
1. in the root folder run : npm update
1. cd client 
1. npm update
1. Put the credentials.json and token.json file in the root directory. 
    1. If you need to generate the credentials.json file, follow the instructions here and use your own gmail account: https://developers.google.com/gmail/api/quickstart/nodejs?authuser=2
    1. The token.json will be generated when you authorize the first time.

Connecting up to the Database:
1. Install MongoDB to your computer (installs found at  https://docs.mongodb.com/manual/installation/ )
1. There are two ways to create a collection in the Database: 
    1. MongoDB Compass GUI: 
        1. install Compass to your computer (There are iOS and Windows installers at https://www.mongodb.com/products/compass )
        1. Create a DB called "msggories" in Compass and add a "collection" called Players ...pay attention to letter case!
    1. MongoDB shell:
        1. execute the following command at the location where mongoDB is installed: 
        mongo --shell use msggories db.createCollection("Players")
        1. control c to exit the shell. 
1. Create a players.json file which will be imported into the database.
    1. The file can be placed anywhere, but should not be checked into Git.
    1. If you are the host, put your name and email into appropriate locations and make sure for host you set the value to true.
    1. Add a json object for each other player. 
    1. Here is an example file:
    ```json 
    [
        {
            "name": "<put_host_name_here>",
            "email": "<put_host_email_here>",
            "score": 0,
            "host": true
        },
        {
            "name": "<put_player_name_here>",
            "email": "<put_player_email_here>",
            "score": 0,
            "host": false
        },
        {
            "name": "<put_player_name_here>",
            "email": "<put_player_email_here>",
            "score": 0,
            "host": false
        }
    ]
    ```

1. Execute the following command at the folder location where mongoDB is installed to import players to the db, where /path/to/the/ represents the path to where players.json file is. The file is in the root directory of the repository by default.

    1. mongoimport --db msggories --collection Players --file /pathTo/players.json --jsonArray
1. When you go to run (steps in next section of ReadMe) verify that "MongoDB Connected" is logged in the terminal. 

To run:
1. npm run dev  

Useful Tools:
1. Install React Developer Tools on your browser of preference.
1. Install Redux DevTools on your browser of preference

