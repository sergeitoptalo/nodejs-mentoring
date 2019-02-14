import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { authCallbacks, authId, authSecret } from './constants';

passport.use(new TwitterStrategy({
    callbackURL: authCallbacks.twitter,
    consumerKey: authId.twitter,
    consumerSecret: authSecret.twitter,
},
    (token, tokenSecret, profile, done) => {
        const user = { username: profile.displayName, email: profile.id };
        done(null, user);
    },
));
