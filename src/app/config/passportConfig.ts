import passport from 'passport';
import { Strategy as LocalStategy } from 'passport-local';
import userController from '../controllers/userController';

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
