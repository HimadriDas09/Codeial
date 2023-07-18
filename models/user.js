const mongoose = require('mongoose');

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
    }
}, {
    timestamps : true
})

/* now : const model_name = mongoose.model('collection name in mongoDB', mongoose Schema name) => dacuments in collection follow mongooseSchema to which we make changes using model */
const User = mongoose.model('User', userSchema);

//export the model to use it somewhere else
module.exports = User;