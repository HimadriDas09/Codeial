//userController.profile => contains below action
module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title : "Home"
    });
}