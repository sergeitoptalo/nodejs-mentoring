import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { authCallbacks, authId, authSecret } from './constants';

passport.use(new FacebookStrategy({
    callbackURL: authCallbacks.facebook,
    clientID: authId.facebook,
    clientSecret: authSecret.facebook,
    profileFields: ['id', 'emails', 'name'],
},
    (accessToken, refreshToken, profile, done) => {
        const user = { username: profile.displayName, email: profile.emails[0].value };
        done(null, user);
    },
));
