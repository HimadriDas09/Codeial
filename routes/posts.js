//this will contain the router for posts controller

//import express to use it's functionality
const express = require('express');

//create router object
const router = express.Router();

//import the controller
const postsController = require('../controllers/posts_controller');

//handling http requests => by calling the correct action from the controller
router.get('/profile', postsController.profile);

module.exports = router;//we export this router so that this can be used in other files