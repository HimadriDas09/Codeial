const express = require('express');
const router = express.Router();

/* import the correct controller here */
const userController = require('../controllers/users_controller');
router.get('/profile', userController.profile);

module.exports = router;