import express from 'express';
import cookieParser from './middlewares/cookieParser';
import queryParser from './middlewares/queryParser';
import { productRoutes, userRoutes } from './routes';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(queryParser());
app.use('/api/products/', productRoutes);
app.use('/api/users/', userRoutes);

export default app;
