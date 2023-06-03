module.exports.home = function(req, res){
    return res.end('<h1>Express is up a for Codeial!</h1>');
}

module.exports.login = function(req, res){
    return res.end('<h1>This is the Login page</h1>');
}