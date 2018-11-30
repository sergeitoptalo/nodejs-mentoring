import appConfig from './config/appConfig.json';
var models = require('./models');

console.log(appConfig.name);

const user = new models.User();
const product = new models.Product();
