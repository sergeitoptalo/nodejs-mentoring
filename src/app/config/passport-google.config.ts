import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { authCallbacks, authId, authSecret } from './constants';

passport.use(new GoogleStrategy({
    callbackURL: authCallbacks.google,
    clientID: authId.google,
    clientSecret: authSecret.google,
},
    (token, tokenSecret, profile, done) => {
        const user = { username: profile.displayName, email: profile.email };
        done(null, user);
    },
));
