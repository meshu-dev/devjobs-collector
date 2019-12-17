'use strict';

require('dotenv').config();

let express    = require('express'),
	app        = express(),
	host       = process.env.APP_HOST || '0.0.0.0',
	port       = process.env.APP_PORT || 3000

// Parse JSON data in requests
app.use(express.json())

// Create and setup routes
let routePath = './app/routes',
	index     = require(routePath + '/index'),
	jobs      = require(routePath + '/jobs')

app.use('/',     index)
app.use('/jobs', jobs)

// Start server
app.listen(port)
console.log('Server started on port ' + port)
