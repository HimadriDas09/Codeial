/* import the model here => to access db or make changes in it */
// const { userInfo } = require('os');
const User = require('../models/user');

//userController.profile => contains below action
module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title : "Home"
    });
}

//render the sign up page
module.exports.signUp = function(req, res) {
    return res.render('user_sign_up', {
        title : "Codeial | Sign Up"
    })
}

//render the sign in page
module.exports.signIn = function(req, res) {
    return res.render('user_sign_in', {
        title : "Codeial | Sign In"
    })
}

//get the sign up data
module.exports.create = function(req, res) {
    //if password and confirm_password are different then redirect back
    if(req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    //so if that email id already exists then we do not create a user else we do
    //User.findOne() now returns a promsise
    User.findOne({email : req.body.email})
    .then((user) => {
        if(!user) {
            //User.create() also returns a promise now
            User.create(req.body)
            .then((user) => {
                return res.redirect('/users/sign-in');
            })
            .catch((err) => {
                console.log('error in creating user while signing up'); 
                return;
            })            
        }
        else {
            return res.redirect('back'); /* if user is already present then redirect to sign-up page : bcz user was in sign-up page */
        }
    })
    .catch((err) => {
        console.log('error in finding user in signing up'); 
        return;
    })
}

//sign in and create a session for the user
module.exports.createSession = function(req, res) {
    //TODO later
}