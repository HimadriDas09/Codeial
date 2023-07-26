/* import the model here => to access db or make changes in it */
// const { userInfo } = require('os');
const User = require('../models/user');

//userController.profile => contains below action
module.exports.profile = function(req, res){
    /* if that user's auth is stored in cookies then open the profile page for the user else open the sign-in page */
    if(req.cookies.user_id) {
        User.findById(req.cookies.user_id)
        .then((user) => {
            if(user) {
                return res.render('user_profile', {
                    title : 'User Profile',
                    user : user
                })
            }
            else {
                //user doesn't exists with that id
                return res.redirect('/users/sign-in');
            }
        })
        .catch((err) => {
            console.log('error finding the user with specified id'); return;
        })
    }
    else {
        return res.redirect('/users/sign-in');
    }
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
    //find the user 
    User.findOne({email : req.body.email})
    .then((user) => {
        if(user) {
            //handle user found > but password doesn't match
            if(user.password != req.body.password) {
                return res.redirect('back');
            }

            //handle user found > password matches > create a session
            //set cookie with user id
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }
        else {
            //handle user not found > user == null
            return res.redirect('back');
        }
    })
    .catch((err) => {
        console.log('error in finding user in signing in'); return;
    })
}