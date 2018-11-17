# MsgGories
A fun and easy way to play scattegories on your phone!

To get Running:
1. in the root folder run : npm update

1. cd client 

1. npm update

1. Create a file called .env in the root directory

1. Go to https://developers.google.com/gmail/api/quickstart/nodejs and Enable the Gmail API

1. In the .env file put the following and replace with the client id and secret key that the above link gave you

1.  GMAIL_CLIENT_ID=<your_client_id>
    GMAIL_SECRET_ID=<your_secret_id>

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