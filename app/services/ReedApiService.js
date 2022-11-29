
const axios = require('axios');

class ReedApiService
{
  constructor(apiUrl, apiKey)
  {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
  }

  getApiConfig()
  {
    return {
      auth: {
        username: this.apiKey, //'23291af6-195e-4e90-bb15-de9a8c2c2193',
        password: ''
      },
      baseURL: this.apiUrl // 'https://www.reed.co.uk/api/1.0'
    };
  }

  async getJobs(params)
  {
    let urlParams = '';

    for (let key in params) {
      if (urlParams) urlParams += '&';

      urlParams += `${key}=${params[key]}`;
    }

    let url = `/search?${urlParams}`,
      result = null;

    console.log('url: '+ url);

    try {
      let response = await axios.get(
        url,
        this.getApiConfig()
      );

      result = response.data;
    } catch (error) {
      console.log("error", error);
    }

    return result || null;
  }


  async getJob(id)
  {
    let url = `/jobs/${id}`,
      result = null;

    console.log('url: '+ url);

    try {
      let response = await axios.get(
        url,
        this.getApiConfig()
      );

      result = response.data;
    } catch (error) {
      console.log("error", error);
    }

    return result;
  }
}

module.exports = ReedApiService;
