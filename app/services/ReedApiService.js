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

	async getJobs()
	{
		let employerId = 0,
			keywords = 'web developer',
			location = 'birmingham',
			distanceFromLocation = '15';

		let params = `keywords=${keywords}&` +
					 `location=${location}&` +
					 `distancefromlocation=${distanceFromLocation}`;

		if (employerId > 0) {
			params +=  `&employerid=${employerId}`;
		}
		let url = `/search?${params}`;

		let result = null;

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
