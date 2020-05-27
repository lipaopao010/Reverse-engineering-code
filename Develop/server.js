// Requiring necessary npm packages

//--This is the npm packages required to be installed in this application
//--It will install express,a web framework for node
//--It will install express-session, which create a session middleware

var express = require("express");
var session = require("express-session");
// Requiring passport as we've configured it
//--Passport is Express-compatible authentication middleware for Node.js.
var passport = require("./config/passport");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
//express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays. 
app.use(express.urlencoded({ extended: true }));
//a. express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object. 
app.use(express.json());
//use the following code to serve images, CSS files, and JavaScript files in a directory named public:
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
//passport.initialize() middleware is required to initialize Passport. 
//This application uses persistent login sessions, passport.session() middleware must also be used.
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
