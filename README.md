# todo-app ![build status](https://travis-ci.org/jpsierens/todo-app.svg?branch=master)

A todo app implemented in Mongo + express as a REST API and a react with redux front end. The api is independent from the FE so it can be run as a microservice. The FE development is powered by webpack with the use of webpacks dev server. 

## Run it
You need 3 commands to develop in this app:

0. ```npm start``` to start up the webpack dev server. 
0. ```mongod``` to start the mongo service. 
0. ```npm run "api"``` to start the api. 

## Test it
```
npm test
```

## Build it
```
npm run "build"
```
