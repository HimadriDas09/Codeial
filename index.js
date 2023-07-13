const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const app = express();
const port = 8000;

const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts); /* mention that we're using express layouts before routes => bcz it then renders (layout part + res.render()) part together and display it on the browser */

//use express router
app.use('/', require('./routes'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        console.log(`Error : ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
})