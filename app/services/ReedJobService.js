class ReedJobService
{
    constructor(
    	devJobsApiService,
    	reedApiService,
    	timeHelper
    ) {
    	this.devJobsApiService = devJobsApiService;
        this.reedApiService = reedApiService;
        this.timeHelper = timeHelper;
        this.isLoggedIn = false;
    }

	async login()
	{
		if (this.isLoggedIn === false) {
			await this.devJobsApiService.login();
		}
	}

    async addJobs(jobSiteId, reedJobsResult)
    {
		let newJobIds      = [],
			reedJobs       = reedJobsResult['results'],
			reedJobsTotal  = reedJobsResult['totalResults'];

		if (reedJobs.length > 0) {
			for (let reedJob of reedJobs) {
				reedJob['jobSiteId'] = jobSiteId;
			 	
			 	let result = await this.devJobsApiService.addJob(reedJob);

			 	if (result && result['id']) {
			 		newJobIds.push(result['jobId']);
			 	}
			}
		}
		return newJobIds;
    }

	async retrieveNewJobs()
	{
		await this.login();
		let jobSite = await this.devJobsApiService.getJobSite('Reed');

		let jobIds = [],
			hasJobs = true,
			params = this.prepareSearchParams(jobSite);

		do {
			let reedJobsResult = await this.reedApiService.getJobs(params);

			if (reedJobsResult && reedJobsResult['results']) {
				let newJobIds = await this.addJobs(jobSite['id'], reedJobsResult);

				if (newJobIds.length > 0) {
					jobIds = jobIds.concat(newJobIds);
				}
				params['resultsToSkip'] += reedJobsResult['results'].length;

				this.timeHelper.wait(5);

				if (params['resultsToSkip'] > 2) hasJobs = false;  // Test
			} else {
				hasJobs = false;
			}
		} while (hasJobs === true);

	    return jobIds;
	}

    prepareSearchParams(jobSite)
    {
		let params = [];

		params['resultsToTake'] = 2;
		params['resultsToSkip'] = 0;

		if (jobSite['searchParams']) {
			for (let key in jobSite['searchParams']) {
				let value = jobSite['searchParams'][key];

				if (Array.isArray(value) === true) {
					value = value[0];
				}
				params[key] = value;
			}
		}
		return params;
    }
}

module.exports = ReedJobService;
