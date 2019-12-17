const axios = require('axios');

class JobController
{
    constructor(reedApiService) {
        this.reedApiService = reedApiService;
    }

	async retrieveJobs(req, res)
	{
		let reedJobs = await this.reedApiService.getJobs();
	    res.json(reedJobs);
	}
}

module.exports = JobController
