const passport = require('passport');

/* LocalStrategy allows u to define how your application should verify user credentials against a localDB */
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//we need to tell passport to use this LocalStrategy that we've created
//authentication using passport
passport.use(new LocalStrategy({
        usernameField : 'email' //how do I uniquely identify each user
    },
    //when localStrategy is called, the email, password, done fn is called
    function(email, password, done) { //done fn inbuild to passport takes 2 args
        //find a user and establish the identity
        User.findOne({email : email})
        .then((user) => {
            if(!user || user.password != password) {
                console.log('Invalid Username/Password');
                return done(null, false); /* 2 args > 0th = if there is an err, 1th = if authentication is done(& not done since something invalid) */
            }
            //user found > so server returns u the user obj, now in serialization fn decide which key to be used for auth.
            return done(null, user);
        })
        .catch((err) => {
            console.log('Error in finding user --> Passport');  
            return done(err); //this will report an error to passport
        })
    }
));

//serializing the user to decide which key is to be kept in the cookies(and this key is only encrypted) > then cookie is automatically sent to the browser
passport.serializeUser(function(user, done){
    done(null, user.id);
})

//deserializing the user from the key in the cookies
//when a user comes in : we need to deserialize that which user is this
passport.deserializeUser(function(id, done) {
    User.findById(id)
    .then((user) => {
        return done(null, user);
    })
    .catch((err) => {
        console.log('error in finding user --> passport');
        return done(err);
    })

})

module.exports = passport;