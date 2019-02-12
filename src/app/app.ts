import express from 'express';
import passport from 'passport';
import { Strategy as LocalStategy } from 'passport-local';
import userController from './controllers/userController';
import cookieParser from './middlewares/cookieParser';
import { checkToken } from './middlewares/jwtParser';
import queryParser from './middlewares/queryParser';
import { authRoutes, productRoutes, userRoutes } from './routes';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(queryParser());
app.use(checkToken);
app.use('/auth/', authRoutes);
app.use('/api/products/', productRoutes);
app.use('/api/users/', userRoutes);

passport.use(new LocalStategy({
    passwordField: 'password',
    session: false,
    usernameField: 'email',
}, (login, password, done) => {
    userController.getAllUsers()
        .then((users) => {
            console.log(users);
        })
        .catch((error) => {
            console.log(error);
        });
}));

export default app;
