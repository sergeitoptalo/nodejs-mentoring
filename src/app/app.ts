import cookieParser from 'cookie-parser';
import express from 'express';
import { productRoutes, userRoutes } from './routes';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api/products/', productRoutes);
app.use('/api/users/', userRoutes);

export default app;
