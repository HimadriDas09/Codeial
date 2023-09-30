/* import the model here => to access db or make changes in it */
// const { userInfo } = require('os');
const User = require('../models/user');

// since no nesting of callbacks OR nested promise handling : so no need to async await

//userController.profile => contains below action
module.exports.profile = function(req, res){
    // bcz we're sending id of the user as query parameters
    User.findById(req.params.id)
    .then((user) => { 
        return res.render('user_profile', {
            title : "Home",
            profile_user : user // to whichever user's profile we want to go to
        });
    })
    .catch((err) => {console.log('error in finding user using id for profile page');})
}

module.exports.update = function(req, res) {
    // check : if profile to update belongs to cur logged in user
    if(req.user.id == req.params.id) {
        // update the id
        /* User.findByIdAndUpdate( which document to update, object contains fields you
        want to change and their new values ) */
        User.findByIdAndUpdate(req.params.id, req.body) 
        .then((user) => {
            // returns the udpated user
            req.flash('success', 'User details updated!');
            return res.redirect('back');
        })
        .catch((err) => {
            console.log('cannot update the document');
            req.flash('error', err);
            return res.redict('back');
        })
    }
    else {
        req.flash('error', 'Unauthorized User!');
        // http status code for unauthorized is 401
        return res.status(401).send('Unauthorized');
    }
}

//render the sign up page
module.exports.signUp = function(req, res) {
    //user is already signed in > redirect to profile page
    if(req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title : "Codeial | Sign Up"
    })
}

//render the sign in page
module.exports.signIn = function(req, res) {
    //user is already signed in > redirect to profile page
    if(req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title : "Codeial | Sign In"
    })
}

//get the sign up data
module.exports.create = function(req, res) {
    //if password and confirm_password are different then redirect back
    if(req.body.password != req.body.confirm_password) {
        req.flash('warning', 'password and confirm password cannot be different!');
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
                req.flash('success', 'New User Created!');
                return res.redirect('/users/sign-in');
            })
            .catch((err) => {
                console.log('error in creating user while signing up'); 
                req.flash('warning', err);
                return res.redirect('back');
            })            
        }
        else {
            req.flash('warning', 'This user already exists, kindly sign in');
            return res.redirect('back'); /* if user is already present then redirect to sign-up page : bcz user was in sign-up page */
        }
    })
    .catch((err) => {
        req.flash('error', 'Could not create user'); 
        return;
    })
}

//sign in and create a session for the user
module.exports.createSession = function(req, res) {
    req.flash('success', req.user.name + ' Logged in Successfully');
    //no need to create a session bcz session is already created by passport itself
    return res.redirect('/');//after authentication against the 'local' strategy in the routes, we're redirected to the home page
}

module.exports.destroySession = function(req, res) {
    req.logout(function(err) {
        if(err) console.log(err + 'in loggin out');
    }); //passport provides this : for session removal & serialized user removal
    
    req.flash('success', 'You have logged out');
    return res.redirect('back'); 
}