'use strict';

let envFilename = '.env'

if (process.env.NODE_ENV !== 'development') {
  envFilename = `.env.${process.env.NODE_ENV}`
}

console.log(`envFilename: ${envFilename}`);

require('dotenv').config({ path: envFilename });

let express    = require('express'),
    app        = express(),
    port       = process.env.APP_PORT || 3000;

// Parse JSON data in requests
app.use(express.json());

// Create and setup routes
let routePath = './app/routes',
    index     = require(routePath + '/index'),
    jobs      = require(routePath + '/jobs');

app.use('/',     index);
app.use('/jobs', jobs);

// Start server
app.listen(port);
console.log('Server started on port ' + port);
