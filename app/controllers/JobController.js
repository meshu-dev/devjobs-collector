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
      dateTime: this.getDateTime(),
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

  formatNumber(value)
  {
    return ("0" + value).slice(-2);
  }
  
  getDateTime()
  {
    const dateObj = new Date();
  
    let year = dateObj.getFullYear();
    let month = this.formatNumber(dateObj.getMonth() + 1);
    let date = this.formatNumber(dateObj.getDate());
    
    let hours = this.formatNumber(dateObj.getHours());
    let minutes = this.formatNumber(dateObj.getMinutes());
    let seconds = this.formatNumber(dateObj.getSeconds());
    
    return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
  }
}

module.exports = JobController;
