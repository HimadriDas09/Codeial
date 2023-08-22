const Post = require('../models/post');
const Comment = require('../models/comment');
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

// deleting a post : getting post_id via req params
module.exports.destroy = function(req, res) {
    // check if the post_id is even valid or not
    Post.findById(req.params.id)
    .then((post) => {
        // I can only delete the post that I've made
        // req.user contains the current logged in user && .id converts the user id to string
        if(post.user == req.user.id) {
            // post deleted : user contains an ObjectId not a string so put req.user._id to query
            Post.findByIdAndDelete(req.params.id)
            .catch((err) => {
                console.log('err in deleting the post');
            }); 

            // now query comments based on post id and delete them
            Comment.deleteMany({post: req.params.id})
            .then((comments) => {
                // returns the no of Comment Object deleted
                return res.redirect('back');
            })
            .catch((err) => {
                console.log('err in deleting all the comments');
            })
        } 
        else {
            return res.redirect('back');
        }
    })
    .catch((err) => {
        console.log('err in finding the post by id');
    })
}