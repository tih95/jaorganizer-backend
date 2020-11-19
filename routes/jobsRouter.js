const express = require('express');
const jobsController = require('../controllers/jobsController');

const { authorizeToken } = require('../middleware/authorizeToken');

const router = express.Router();

router.route('/')
   .get(authorizeToken, jobsController.getAllJobs)
   .post(authorizeToken, jobsController.addJob);

router.route('/:id')
   .get(authorizeToken, jobsController.getOneJob)
   .put(authorizeToken, jobsController.editJob)
   .delete(authorizeToken, jobsController.deleteJob);

module.exports = router;