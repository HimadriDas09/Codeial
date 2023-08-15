const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content : {
        type : String,
        required : true
    },
    user : {
        //user points to a document of a Collection 'User' having an ObjectId
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
}, {
    timestamps : true
});

//model_name(for CRUD) = mongoose.model('collection_name in db', collection_Schema)
const Post = mongoose.model('Post', postSchema);

module.exports = Post;