'use strict';

const path = require('path'); 
require('dotenv').config({ path: path.join(__dirname, '.env') });

let express = require('express'),
  app = express(),
  port = process.env.APP_PORT || 3001;

// Parse JSON data in requests
app.use(express.json());

// Create and setup routes
let routePath = './app/routes',
  index = require(routePath + '/index'),
  jobs = require(routePath + '/jobs');

app.use('/', index);
app.use('/jobs', jobs);

// Start server
app.listen(port);
console.log(`Server started on port ${port}`);
