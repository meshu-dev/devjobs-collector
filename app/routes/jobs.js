let express = require('express'),
	router  = express.Router(),
	JobController = require('./../controllers/JobController'),
	ReedApiService = require('./../services/ReedApiService'),
	jobController = new JobController(new ReedApiService());

router.get('/retrieve', jobController.retrieveJobs.bind(jobController));

module.exports = router
