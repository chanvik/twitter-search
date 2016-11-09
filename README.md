# Twitter-search

#Installation instructions:
1) Unzip the package folder provided into the local system.
2) Setup node - Download Node from https://nodejs.org/en/download/ and setup the environment varialbes in the system.
3) If Node is already installed - open command prompt/terminal and navigate to the project folder twitter-search and then run the below commands
~\\..twitter-search > npm install
npm install regex --save
Navigate to twitter-search\public\client and run the following commands :
npm install
npm install git
npm bower install --save
bower install

#MongoDB project data setup
1) Install Mongodb from https://www.mongodb.org/downloads#production
2) If Mongodb is already configured run the below commands
Navigate to mongodb folder and run > mongod. 
Open a command prompt and run the command to import the data.
mongoimport --db twitter --collection tweets --type csv --headerline --file "Your tweets.csv file location"


Index the text field of data to be searchable by typing in db.tweets.createIndex({"text":"text"}) into mongo client

#To run the application
1)Navigate to the project folder >twitter-search and run the command
node server


#User manual
The application searches the content of the tweets, by taking a keyword .Enter a keyword in the text field and hit the submit button to display all the tweets which contain the keyword entered. It displays a list of tweets, click on the ViewData button to view its content or make a comment. In the comment page, it displays the respective tweet data and lets the user to add additional comments.
