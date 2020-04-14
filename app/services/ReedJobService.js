class ReedJobService
{
    constructor(
    	devJobsApiService,
    	reedApiService,
    	timeHelper,
    	resultsPerRequest
    ) {
    	this.devJobsApiService = devJobsApiService;
        this.reedApiService = reedApiService;
        this.timeHelper = timeHelper;
        this.resultsPerRequest = resultsPerRequest;
        this.isLoggedIn = false;
    }

	async login()
	{
		if (this.isLoggedIn === false) {
			await this.devJobsApiService.login()
		}
	}

    async addJobs(jobSite, reedJobsResult)
    {
		let newJobIds      = [],
			reedJobs       = reedJobsResult['results'],
			reedJobsTotal  = reedJobsResult['totalResults'];

		if (reedJobs.length > 0) {
			for (let reedJob of reedJobs) {
				const jobId = reedJob['jobId'] || null

				if (jobId) {
					let reedJobResult = await this.reedApiService.getJob(
						jobId
					)
				 	reedJobResult['jobSiteId'] = jobSite['id']
				 	reedJobResult['thumb'] = jobSite['logo']
				 	reedJobResult['date'] = reedJobResult['datePosted']

				 	const result = await this.devJobsApiService.addJob(
				 		reedJobResult
				 	)
				 	if (result && result['id']) {
				 		newJobIds.push(result['jobId'])
				 	}
					this.timeHelper.wait(2)
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
			jobSearches = this.prepareSearchParams(jobSite)

		for (const jobSearch of jobSearches) {
			const newJobIds = await this.runJobSearch(jobSite, jobSearch)
			jobIds = jobIds.concat(newJobIds)
		}

	    return jobIds 
	}

	async runJobSearch(jobSite, searchParams)
	{
		let jobIds = [],
			hasJobs = true

		do {
			let reedJobsResult = await this.reedApiService.getJobs(searchParams)
			
			this.timeHelper.wait(2)

			if (reedJobsResult && reedJobsResult['results']) {
				let newJobIds = await this.addJobs(jobSite, reedJobsResult)

				if (newJobIds.length > 0) {
					jobIds = jobIds.concat(newJobIds)
				}
				searchParams['resultsToSkip'] += reedJobsResult['results'].length

				if (!reedJobsResult || reedJobsResult['results'].length === 0) {
					hasJobs = false  // Test
				}
			} else {
				hasJobs = false
			}
		} while (hasJobs === true)

		return jobIds
	}

    prepareSearchParams(jobSite)
    {
		let jobSearches = jobSite['searchParams'] || null

		if (jobSearches) {
			for (let key in jobSearches) {
				jobSearches[key]['resultsToTake'] = this.resultsPerRequest
				jobSearches[key]['resultsToSkip'] = 0
			}
		}
		return jobSearches
    }
}

module.exports = ReedJobService;
