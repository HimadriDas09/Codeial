const Post = require('../models/post');
//controller is a module of actions 

module.exports.create = function(req, res) {
    /* NOTE : since creating a post is in homepage && any user(not signed in) can also create a post > so we need to restrict that */
    Post.create({ 
        content : req.body.content,
        user : req.user.id 
    })
    .then((user) => {
        return res.redirect('back');
    })
    .catch((err) => {
        console.log('error in creating a post');
        return;
    })
}