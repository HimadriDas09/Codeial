const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.get('/login', homeController.login);

router.use('/users', require('./users'));/* => if incoming http request is /users then use the router of users.js, it will forward the request to the correct controller i.e (set of actions/fns) => we're importing the module users*/
router.use('/posts', require('./posts'));

module.exports = router;