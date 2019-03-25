require('./mongoDb');
const SwaggerExpress = require('swagger-express-mw');
const express = require('express');
const prettySwag = require('pretty-swag');

const app = require('express')();

const prettySwagConfig = require('./pretty-swag-config/config.json');

const config = {
    appRoot: __dirname // required config
};

const buildUI = () => new Promise((resolve, reject) => {
    prettySwag.run(prettySwagConfig.input, prettySwagConfig.output, prettySwagConfig, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("UI is generated");
            resolve();
        }
    });
})

buildUI()
    .then(() => {
        SwaggerExpress.create(config, function (err, swaggerExpress) {
            if (err) { throw err; }

            swaggerExpress.register(app);

            var port = process.env.PORT || 10010;

            app.use(express.static('public'));
            app.listen(port);
            console.log('App is running')

            if (swaggerExpress.runner.swagger.paths['/hello']) {
                console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
            }
        });
    });

module.exports = app; // for testing
