const express = require('express');
const usersController = require('../controllers/usersController');
const { authorizeToken } = require('../middleware/authorizeToken');

const router = express.Router();

router.route('/:email')
   .post(authorizeToken, usersController.editUserEmail);

module.exports = router;
