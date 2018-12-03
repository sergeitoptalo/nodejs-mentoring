import appConfig from './config/appConfig.json';
import { User, Product } from './models';

console.log(appConfig.name);

new User();
new Product();
