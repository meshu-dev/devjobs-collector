const axios = require('axios');

class JobController
{
    constructor(reedApiService)
    {
        this.reedApiService = reedApiService;
    }

	async retrieveJobs(req, res)
	{
		let params = {
			keywords: 'Php developer',
			locationName: 'Birmingham',
			distanceFromLocation: '15'
		};

		//let reedJobs = await this.reedApiService.getJobs(params);
	    //res.json(reedJobs);
	
		let reedJob = await this.reedApiService.getJob(39534929);
	    res.json(reedJob);
	}
}

module.exports = JobController
