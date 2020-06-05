const axios = require('axios');

class DevJobsApiService
{
    constructor(
        apiUrl,
        email,
        password
    ) {
        this.apiUrl = apiUrl;
        this.email = email;
        this.password = password;
        this.token = null;
    }

    getApiConfig()
    {
        let params = {
            baseURL: this.apiUrl
        };

        if (this.token) {
            params['headers'] = {
                'Authorization': "bearer " + this.token
            };
        }
        return params;
    }

    async login()
    {
        let result = null;

        try {
            let response = await axios.post(
                `/auth/login`,
                {
                    email: this.email,
                    password: this.password
                },
                this.getApiConfig()
            );
            result = response.data;

            if (result.token) {
                this.token = result.token;
                return true;
            }
        } catch (error) {
            console.log("error", error);
        }
        return false;
    }

    async addJob(params)
    {
        let url = `/jobs`,
            result = null;

        try {
            let response = await axios.post(
                url,
                params,
                this.getApiConfig()
            );

            result = response.data;

            if (result[0]) {
                result = result[0];
            }
        } catch (error) {
            console.log("error", error);
        }

        return result;
    }

    async getJobSite(name)
    {
        let url = `/job-sites?name=${name}`,
            result = null;

        console.log('this.getApiConfig()');
        console.log(this.getApiConfig());

        try {
            let response = await axios.get(
                url,
                this.getApiConfig()
            );

            result = response.data;

            if (result[0]) {
                result = result[0];
            }
        } catch (error) {
            console.log("error", error);
        }

        return result;
    }


    getJobSiteData()
    {
        let params = {
            keywords: 'Php developer',
            locationName: 'Birmingham',
            distanceFromLocation: '15'
        };

        return params;
    }
}

module.exports = DevJobsApiService;
