const express = require('express');
const router = express.Router();

/* import the correct controller here */
const usersController = require('../controllers/users_controller');

router.get('/profile', usersController.profile);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

/* from form data is sent to /users/create => so for that route : call the action to create a user && this route doesn't gets you anything : it just POST data to the server*/
router.post('/create', usersController.create);
router.post('/create-session', usersController.createSession);
router.get('/sign-out', usersController.signOut);

module.exports = router;