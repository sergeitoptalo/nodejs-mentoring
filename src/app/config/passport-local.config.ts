import passport from 'passport';
import { Strategy as LocalStategy } from 'passport-local';
import userController from '../controllers/user.controller';
import { IUser } from '../models/user.model';

passport.use(new LocalStategy({
    passwordField: 'password',
    session: false,
    usernameField: 'login',
}, (login, password, done) => {
    userController.getUserByEmail(login)
        .then((user: IUser) => {
            if (!user || user.password !== password) {
                done(null, false, { message: 'Incorrect credentials' });
            } else {
                done(null, user);
            }
        })
        .catch((error) => {
            console.log(error);
        });
}));

passport.serializeUser<any, any>((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
