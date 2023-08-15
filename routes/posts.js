const express = require('express');
const router = express.Router(); // fn returns a router object

const postsController = require('../controllers/posts_controller');

router.post('/create', postsController.create);

module.exports = router;