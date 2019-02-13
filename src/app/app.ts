import express from 'express';
import cookieParser from './middlewares/cookieParser';
import queryParser from './middlewares/queryParser';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(queryParser());
app.use(routes);

export default app;
