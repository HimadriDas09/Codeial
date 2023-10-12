// surrounding with {} just for scope
{
    // method to submit the form data for new post using AJAX
    let createPost = function() {
        let newPostForm = $('#new-posts-form');

        newPostForm.submit(function(e) {
            e.preventDefault(); /* to not submit the form directly to the sever
            but rather submit using AJAX */

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(), // data sent as request body to the server in the form of url-encoded string
                success: function(data) {
                    /* after form submission to the server via the api, server returns requested response */
                    let newPost = newPostDom(data.data.post);
                    // now prepend it to the list 
                    $('#posts-list-container > ul').prepend(newPost);

                    // call deletePost(newly created Post) > attaches a handler to this elem > when clicked > deletion using AJAX is done.
                    deletePost($(' .delete-post-button', newPost)); // under newPost AJAX Obj fetch the obj whose class is .delete-post-button
                },
                error: function(err) {
                    console.log(err.responseText); 
                }
            })
        })
    }

    // method to create a post in DOM
    let newPostDom = function(post) {
        // post contain newly created post obj from the server
        // only return a part of the webpage in AJAX
        /* since we're adding to the DOM, so some stuffs might not be required to be
        added to the elem> so edit */
        
        return $(`<li class="post" id="post-${post._id}">
                    <p>
                        <small>
                            <a class="delete-post-button" href="/posts/destroy/${post._id}"><i class="fa-solid fa-trash" style="color: #ff2424;"></i></a>
                        </small>
                        
                        
                        <strong style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; font-size: medium;">${post.content}</strong>
                        <br>
                        <small>
                            ${post.user.name}
                        </small>
                        <div id="post-comments"> 
                            <form action="/comments/create" method="POST" id="comment-form">
                                <input type="text" name="content" placeholder="Type here to add comments..." required autocomplete="off">
                                <input type="hidden" name="post" value="${post._id}">
                                <br>
                                <input type="submit" value="Add comment">
                            </form>
                
                            <div class="post-comments-list">
                                <ul id="post-comments-${post._id}">

                                </ul>
                            </div>
                        </div>
                    </p>
                </li>`)
    }


    // method to delete post from DOM

    /* deleteLink is the <a> tag on which we're clicking to delete the post, whose href = /posts/destroy/<%= post.id %> 
    => to pass this AJAX obj using jquery to the deletePost fn 
    syntax: $(' .class_name', Obj) => within Obj get the obj with className = 'class_name'
    */
    let deletePost = function(deleteLink) {
        // deleteLink is the elem on which we're clicking
        $(deleteLink).click(function(e) {
            e.preventDefault(); // normal http req won't be sent to the server
            // rather an xhr req will be sent

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data) {
                    /* suppose: in server: elem is deleted from db and post obj of the elem is returned > so that this elem could be removed from DOM */
                    // now delete this elem(elem with id: post-<%= post.id%>) from DOM
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function(err) {
                    console.log(err.responseText);
                }
            })
        })
    }


    createPost();
    // createPost() run only once and attach a click handler to createPost
    // as many times as you submit the form: that many times the ajax req is sent
}