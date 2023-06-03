//userController.profile => contains below action
module.exports.profile = function(req, res){
    return res.end('<h1>Users Profile</h1>');
}

module.exports.saved = function(req, res){
    return res.end('<h1>Hey! All your saved items are here</h1>')
}