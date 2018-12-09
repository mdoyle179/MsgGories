# MsgGories
A fun and easy way to play scattegories on your phone!

To get Running:
1. in the root folder run : npm update

1. cd client 

1. npm update

1. Put the credentials.json and token.json file in the root directory. If you need to generate the credentials.json file, follow the instructions here and use your own gmail account: https://developers.google.com/gmail/api/quickstart/nodejs?authuser=2 . The token.json will be generated when you authorize the first time.

1. npm run dev

Useful Tools:
1. Install React Developer Tools on your browser of preference.

1. Install Redux DevTools on your browser of preference

Git:
1. Here is a good tutorial/documentation for Git: https://git-scm.com/docs/gittutorial

1. To use Git, you can download it here: https://git-scm.com/downloads, 
or you can use a Gui like SourceTree: https://www.sourcetreeapp.com/
It's probably better to learn from the command line, but SourceTree will help you visualize how Git works and is probably easier to use.

1. To be able to start sharing code in Git, you'll need to clone the repo. There should be a link in GitHub to clone it.

1. Once you have it cloned, you can pull master.
   Here is a possibility for our branching structure:
master: Contains our tested/working code.
dev: Contains our current development work. (dev will be a branch off of master)

Connecting up to the Database:
1) Install MongoDB to your computer (installs found at  https://docs.mongodb.com/manual/installation/ )
2) download a copy of players.csv from the repo 
3) two ways to create DB with collection: 
    a) with the MongoDB Compass GUI: 
        i) install Compass to your computer (There are iOS and Windows installers at https://www.mongodb.com/products/compass )
        ii) Create a DB called "msggories" in Compass and add a "collection" called Players ...pay attention to letter case!
    b) with the MongoDB shell:
        i) execute the following command at the location where mongoDB is installed: 
        mongo --shell 
        use msggories 
        db.createCollection("Players")
        ii) control c to exit the shell. 
        
4) execute the following command at the folder location where mongoDB is installed to import players to the db, where /path/to/the/ represents the path to where you saved the file in step 2: mongoimport --db msggories --collection Players --type csv --file /path/to/the/players.csv --headerline
5) Uncomment out the DB connection code in server.js 
6) Once application is started verify "MongoDB Connected" is received in the terminal logwin. 

