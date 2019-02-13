import express from 'express';
import productRoutes from './products';
import userRoutes from './users';

const routes = express.Router();
routes.use('/api/products', productRoutes);
routes.use('/api/users', userRoutes);

export default routes;
