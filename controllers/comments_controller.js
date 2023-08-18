const Comment = require('../models/comment');
const Post = require('../models/post');

/* creating a comment : via the route we send(content, post id) and user id is in req.user
also since we created a comment under a post > so inside the post document of this post the comment id has to be added > so via the post_id get the post_document and add the id of the created comment inside the comment array */

/* since we're sending the post id as hidden : user can fiddle with the id in inspect section and send the post : so to avoid further err : verify if the post_id sent is even valid or not */
module.exports.create = function(req, res) {
    Post.findById(req.body.post)
    .then((post) => {
        if(post) {
            //post is not NULL : create a comment
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            })
            .then((comment) => {
                //add the comment id to the already created post document i.e UPDATING THE DB
                post.comments.push(comment); //provided by mongoDB
                post.save(); // before save it's only in RAM : after save() updated in DB

                return res.redirect('/');
            })
            .catch((err) => {
                console.log('error in creating comment');
            })
        }
        else {
            return res.redirect('/');
        }
    })
    .catch((err) => {
        console.log('error in finding the post');
    })
}