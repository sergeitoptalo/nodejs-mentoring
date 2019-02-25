import passport from 'passport';
import { Strategy as LocalStategy } from 'passport-local';
import userController from '../controllers/user.controller';
import { IUser } from '../models/user.model';

passport.use(new LocalStategy({
    passwordField: 'password',
    session: false,
    usernameField: 'login',
}, (login, password, done) => {
    userController.getAllUsers()
        .then((users: IUser[]) => {
            const validatedUser = users.find((user) => user.email === login);
            if (!validatedUser || validatedUser.password !== password) {
                done(null, false, { message: 'Incorrect credentials' });
            } else {
                done(null, validatedUser);
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
