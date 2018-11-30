import appConfig from './config/appConfig.json';
import * as models from './models';

const { User, Product } = models.default;

console.log(appConfig.name);

const user = new User();
const product = new Product();
