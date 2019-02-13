import express from 'express';
import passport from 'passport';
import './config/passport.config';
import cookieParser from './middlewares/cookieParser';
import { checkToken } from './middlewares/jwtParser';
import queryParser from './middlewares/queryParser';
import routes from './routes';

const app = express();

app.use(cookieParser());
app.use(queryParser());
app.use(express.json());
app.use(passport.initialize());
app.use(checkToken);

app.use(routes);

export default app;
