const express = require('express');
const router = express.Router();

/* import the correct controller here */
const userController = require('../controllers/users_controller');

//calling correct action from the controller
router.get('/profile', userController.profile);
router.get('/saved', userController.saved);

module.exports = router;