module.exports.home = function(req, res){
    // return res.end('<h1>Express is up a for Codeial!</h1>');
    return res.render('home', {
        title : "Home"
    })
    //since app.set('views', './views') => so 'home' targets '../views/home.ejs' and we pass an object with key and values
}