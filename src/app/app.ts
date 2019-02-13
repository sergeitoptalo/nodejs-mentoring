import express from 'express';
import cookieParser from './middlewares/cookieParser';
import { checkToken } from './middlewares/jwtParser';
import queryParser from './middlewares/queryParser';

import { authRoutes, productRoutes, userRoutes } from './routes';

import routes from './routes';


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(queryParser());

app.use(checkToken);
app.use('/auth/', authRoutes);
app.use('/api/products/', productRoutes);
app.use('/api/users/', userRoutes);

app.use(routes);


export default app;
