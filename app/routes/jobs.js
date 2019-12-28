require('dotenv').config();

let express = require('express'),
	router  = express.Router(),
	JobController     = require('./../controllers/JobController'),
	TimeHelper        = require('./../helpers/TimeHelper'),
	ReedJobService    = require('./../services/ReedJobService'),
	DevJobsApiService = require('./../services/DevJobsApiService'),
	ReedApiService    = require('./../services/ReedApiService');

let timeHelper = new TimeHelper();

let devJobsApiService = new DevJobsApiService(
	process.env.DEVJOBS_API_URL,
	process.env.DEVJOBS_API_EMAIL,
	process.env.DEVJOBS_API_PASSWORD
);

let reedApiService = new ReedApiService(
	process.env.REED_API_URL,
	process.env.REED_API_KEY
);

let jobService = new ReedJobService(
	devJobsApiService,
	reedApiService,
	timeHelper
);

let jobController = new JobController(jobService);

router.post('/retrieve', jobController.retrieve.bind(jobController));
router.post('/cleanup', jobController.cleanUp.bind(jobController));

module.exports = router
