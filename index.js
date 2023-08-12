const express = require('express');
const cookieParser = require('cookie-parser');
const expressEjsLayouts = require('express-ejs-layouts');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose'); //require db
const dotenv = require('dotenv');
//set path to .env file
dotenv.config({path: './.env'});

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal  = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

app.use(express.urlencoded()); //to parse form data into req.body
app.use(cookieParser()); //to parse cookie data into req.cookie

app.use(express.static('./assets'));

app.use(expressLayouts); /* mention that we're using express layouts before routes => bcz it then renders (layout part + res.render()) part together and display it on the browser */

/* to make it extract styles and scripts from subpages to the layouts */
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');

//set up a session middleware with cookie name, secrets, maxAge of cookie, etc
app.use(session({
    name: 'codeial',
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    //we're using mongoStore to store the session cookie in the db
    store: MongoStore.create({
        mongoUrl: process.env.DB_URI,
        autoRemove: 'disabled'
    })
}));

//to app to use passport and passport session
app.use(passport.initialize());
app.use(passport.session());
//stores the user's data in req into res.locals for the views to use it
app.use(passport.setAuthenticatedUser);

//use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error : ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
})