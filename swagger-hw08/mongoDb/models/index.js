/* export { City } from './city.model';
export { Product } from './product.model';
export { User } from './user.model';
 */
const City = require('./city.model').City;
const Product = require('./city.model').Product;
const User = require('./city.model').User;

module.exports = { City, Product, User };