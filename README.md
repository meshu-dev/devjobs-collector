# Dev Jobs Collector

An app built with Node.js and Express.js that's used to retrieve jobs from multiple job sites and store them to the Dev Jobs API, at the moment this app retrieves using Reed's Job search API. 

## Install software
### NodeJS
- Install in ubuntu
```
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs
```
- Install in MacOS via brew 
```
brew install node
```
### Dev Jobs API
Go to https://github.com/meshu-dev/devjobs-api then follow install and setup instructions

## Setup 
- Install npm packages
```
npm install
```
- Copy the .env.example file to a new file named .env
```
cp .env.example .env
```
- Fill in .env variables in new file
    - DEVJOBS_API parameters from Dev Jobs API
    - REED_API parameters from Reed Job API
```
APP_ENV=dev
APP_PORT=3001

DEVJOBS_API_URL=http://localhost:8000
DEVJOBS_API_EMAIL=
DEVJOBS_API_PASSWORD=

REED_API_URL=https://www.reed.co.uk/api/1.0
REED_API_KEY=

JOBS_PER_PAGE=100
```
## Commands
- Run app in development
```
npm run start
```
- Run app in test
```
npm run start:test
```
- Run app in production
```
npm run start:production
```
