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
      await this.devJobsApiService.login();
    }
  }

  async addJobs(jobSite, reedJobsResult)
  {
    let newJobIds = [],
      reedJobs = reedJobsResult['results'];

    if (reedJobs.length > 0) {
      for (let reedJob of reedJobs) {
        let jobId = reedJob['jobId'] || null;

        if (jobId) {
          let reedJobResult = await this.reedApiService.getJob(
            jobId
          );

          jobId = reedJobResult['jobId'];

          const job = await this.devJobsApiService.getJob(
            jobId, jobSite['id']
          );

          if (job == null || job.length == 0) {
            let jobDate = this.getApiDate(
              reedJobResult['datePosted']
            );
  
            const params = {
              jobId: jobId,
              jobSiteId: jobSite['id'],
              params: reedJobResult
            };
  
            if (jobDate) {
              params['date'] = jobDate;
            }
  
            console.log('reedJobResult: ', params);
  
            const result = await this.devJobsApiService.addJob(
              params
            );
  
            if (result && result['id']) {
              newJobIds.push(result['jobId']);
            }
          }

          this.timeHelper.wait(2);
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
      jobSearches = this.prepareSearchParams(jobSite);

    if (jobSearches) {
      for (const jobSearch of jobSearches) {
        const newJobIds = await this.runJobSearch(jobSite, jobSearch);
        jobIds = jobIds.concat(newJobIds);
      }
    }
    return jobIds;
  }

  async runJobSearch(jobSite, searchParams)
  {
    let jobIds = [],
        hasJobs = true;

    do {
      let reedJobsResult = await this.reedApiService.getJobs(searchParams);
      
      this.timeHelper.wait(2);

      if (reedJobsResult && reedJobsResult['results']) {
        let newJobIds = await this.addJobs(jobSite, reedJobsResult);

        if (newJobIds.length > 0) {
          jobIds = jobIds.concat(newJobIds);
        }
        searchParams['resultsToSkip'] += reedJobsResult['results'].length;

        if (!reedJobsResult || reedJobsResult['results'].length === 0) {
          hasJobs = false  // Test
        }
      } else {
        hasJobs = false;
      }
    } while (hasJobs === true);

    return jobIds;
  }

  prepareSearchParams(jobSite)
  {
    let jobSearches = jobSite && jobSite['searchParams'] || null;

    if (jobSearches) {
      for (let key in jobSearches) {
        jobSearches[key]['resultsToTake'] = this.resultsPerRequest
        jobSearches[key]['resultsToSkip'] = 0
      }
    }
    return jobSearches;
  }

  getApiDate(date)
  {
    const dateData = date.split('/');
    const year = dateData[2] || null;
    const month = dateData[1] || null;
    const day = dateData[0] || null;

    date = null;

    if (year && month && day) {
      date = `${year}-${month}-${day}`;
    }
    return date;
  }
}

module.exports = ReedJobService;
