'use strict';

var SwaggerExpress = require('swagger-express-mw');
const express = require('express');
const prettySwag = require('pretty-swag');

var app = require('express')();
 
var prettySwagConfig = require('./pretty-swag-config/config.json');

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;

  prettySwag.run(prettySwagConfig.input,prettySwagConfig.output,prettySwagConfig,function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("success");
    }
});

  app.use(express.static('public'));
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});

module.exports = app; // for testing
