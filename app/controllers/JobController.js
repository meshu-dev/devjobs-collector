class JobController
{
  constructor(reedJobService)
  {
      this.reedJobService = reedJobService;
  }

  async retrieve(req, res)
  {
    let newJobIds = await this.reedJobService.retrieveNewJobs();

    res.json({
      jobSite: 'Reed',
      newJobIds: newJobIds
    }); 
  }

  async cleanUp(req, res)
  {
    /*
    let params = {
        keywords: 'Php developer',
        locationName: 'Birmingham',
        distanceFromLocation: '15'
    }; */

    //let reedJobs = await this.reedApiService.getJobs(params);
    //res.json(reedJobs);

    //let reedJob = await this.reedApiService.getJob(39534929);
    //res.json(reedJob);

    res.json({ a: 'b' });
  }
}

module.exports = JobController
