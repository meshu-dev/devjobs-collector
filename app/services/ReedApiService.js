require('dotenv').config();

const axios = require('axios');

class ReedApiService
{
	getApiConfig()
	{
		return {
			auth: {
			    username: process.env.REED_API_KEY, //'23291af6-195e-4e90-bb15-de9a8c2c2193',
			    password: ''
			},
			baseURL: process.env.REED_API_URL // 'https://www.reed.co.uk/api/1.0'
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

	    return result;
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

module.exports = ReedApiService
