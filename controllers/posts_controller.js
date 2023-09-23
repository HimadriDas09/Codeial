const Post = require('../models/post');
const Comment = require('../models/comment');
//controller is a module of actions 

module.exports.create = async function(req, res) {
    /* NOTE : since creating a post is in homepage && any user(not signed in) can also create a post > so we need to restrict that */
    try {
        await Post.create({ 
            content : req.body.content,
            user : req.user.id 
        })

        return res.redirect('back');

    } catch(err) {
        console.log('Error', err);
    }   
}

// deleting a post : getting post_id via req params
module.exports.destroy = async function(req, res) {
    try {
        // check if the post_id is even valid or not
        let post = await Post.findById(req.params.id) // id is the variable name in params in route
        // I can only delete the post that I've made
        // req.user contains the current logged in user && .id converts the user id to string
        if(post.user == req.user.id) {
            // post deleted : user contains an ObjectId not a string so put req.user._id to query
            await Post.findByIdAndDelete(req.params.id)

            // now query comments based on post id and delete them
            await Comment.deleteMany({post: req.params.id})
            
            return res.redirect('back');
        } 
        else {
            return res.redirect('back');
        }
    } catch(err) {
        console.log('Error', err);
    }
}