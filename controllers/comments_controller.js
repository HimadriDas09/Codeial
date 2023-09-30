const Comment = require('../models/comment');
const Post = require('../models/post');

/* creating a comment : via the route we send(content, post id) and user id is in req.user
also since we created a comment under a post > so inside the post document of this post the comment id has to be added > so via the post_id get the post_document and add the id of the created comment inside the comment array */

/* since we're sending the post id as hidden : user can fiddle with the id in inspect section and send the post : so to avoid further err : verify if the post_id sent is even valid or not */
module.exports.create = async function(req, res) {
    try {
        let post = await Post.findById(req.body.post)
        
        if(post) {
            //post is not NULL : create a comment
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            })
            
            //add the comment id to the already created post document i.e UPDATING THE DB
            post.comments.push(comment); //provided by mongoDB
            post.save(); // before save it's only in RAM : after save() updated in DB

            req.flash('success', 'New comment added!');
            return res.redirect('/');
            
        }
        else {
            req.flash('warning', 'you are not adding comment to a valid post!');
            return res.redirect('/');
        }

    } catch(err) {
        req.flash('error', 'unable to post comment');
        return res.redirect('back');
    }
   
}

module.exports.destroy = async function(req, res) {
    try {
        // if comment id is valid 
        let comment = await Comment.findById(req.params.id).populate('post')
        // bcz of :id in routes as var name

        // a user can only delete his comment
        // OR the user who created the post can also delete comments under his post 
        // get the post id of comment > to see the user who made the post
        let PostUserId = comment.post.user;

        if(comment.user == req.user.id || PostUserId == req.user.id){
            // save the post id of the comment, so that after deleting the comment we can go to the post > search it's comments array and delete the id from there also
            let postId = comment.post.id;

            // delete the comment object
            await Comment.findByIdAndDelete(req.params.id)

            // update the post
            await Post.findByIdAndUpdate(postId, {
                $pull: {comments: req.params.id}
            })
            
            req.flash('success', 'Comment deleted successfully!')
            return res.redirect('back');
        }
        else {
            req.flash('warning', 'You are not eligible to delete this comment');
            return res.redirect('back');
        }
        
    } catch(err) {
        req.flash('error', err);
        return res.redirect('back');
    }
}