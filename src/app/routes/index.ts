import express from 'express';
import authRoutes from './auth';
import cityRoutes from './cities';
import productRoutes from './products';
import userRoutes from './users';

const routes = express.Router();
routes.use('/auth', authRoutes);
routes.use('/api/cities', cityRoutes);
routes.use('/api/products', productRoutes);
routes.use('/api/users', userRoutes);

export default routes;
