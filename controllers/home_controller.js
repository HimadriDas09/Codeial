module.exports.home = function(req, res){
    // return res.end('<h1>Express is up a for Codeial!</h1>');
    console.log(req.cookies); /* req.cookies to access all cookies */
    res.cookie('user_id', 25); /* req.cookie to change particular cookie */
    return res.render('home', {
        title : "Home"
    })
    //since app.set('views', './views') => so 'home' targets '../views/home.ejs' and we pass an object with key and values
}