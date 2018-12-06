import appConfig from './config/appConfig.json';
import { Product, User } from './models';

console.log(appConfig.name);

new User();
new Product();
