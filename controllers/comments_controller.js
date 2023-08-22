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

module.exports.destroy = function(req, res) {
    // if comment id is valid 
    Comment.findById(req.params.id).populate('post').exec() // bcz of :id in routes as var name
    .then((comment) => {
        // a user can only delete his comment
        // OR the user who created the post can also delete comments under his post 
        // get the post id of comment > to see the user who made the post
        let PostUserId = comment.post.user;

        if(comment.user == req.user.id || PostUserId == req.user.id){
            // save the post id of the comment, so that after deleting the comment we can go to the post > search it's comments array and delete the id from there also
            let postId = comment.post.id;

            // delete the comment object
            Comment.findByIdAndDelete(req.params.id)
            .then((comment) => {
                return res.redirect('back');
            })
            .catch((err) => {
                console.log('err in deleting comment');
            })

            // update the post
            Post.findByIdAndUpdate(postId, {
                $pull: {comments: req.params.id}
            })
            .then((post) => {
                return res.redirect('back');
            })
            .catch((err) => {console.log('err in updating the post after deleting comment');})
        }
        else {
            return res.redirect('back');
        }
    })
    .catch((err) => {
        console.log('err in finding the comment and populating its post');
    })
}