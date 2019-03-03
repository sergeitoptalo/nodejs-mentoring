import express from 'express';
import session from 'express-session';
import passport from 'passport';
import './config/passport-facebook.config';
import './config/passport-google.config';
import './config/passport-local.config';
import './config/passport-twitter.config';
import cookieParser from './middlewares/cookieParser';
import { checkToken } from './middlewares/jwtParser';
import { modifiedDateSetter } from './middlewares/modifiedDateSetter';
import queryParser from './middlewares/queryParser';
import routes from './routes';

const app = express();

app.use(cookieParser());
app.use(queryParser());
app.use(express.json());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'secret',

  }));
app.use(passport.initialize());
app.use(checkToken);
app.use(modifiedDateSetter);

app.use(routes);

export default app;
