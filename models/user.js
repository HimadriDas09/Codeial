const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema = mongoose.Schema({
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true 
    },
    avatar: {
        type: String
    }
}, {
    timestamps : true
})

// destination and filename of the file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
        /* __dirname: location of user.js, '..': we moved 2 levels up, from there we went to /uploads/users/avatars */
    },
    filename: function (req, file, cb) {
        // for unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})


// defining static methods
userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
/* multer({storage}).single(field_name) => creates a middleware fn(which we're supposed to call for specific route/controller i.e one on which we're uploading the file) => && we're specifying the storage and single file to be uploaded */
// handles the file upload and storage
userSchema.statics.avatarPath = AVATAR_PATH;
// path where images are stored, could be used to retrieve the image

/* now : const model_name = mongoose.model('collection name in mongoDB', mongoose Schema name) => dacuments in collection follow mongooseSchema to which we make changes using model */
const User = mongoose.model('User', userSchema);

//export the model to use it somewhere else
module.exports = User;