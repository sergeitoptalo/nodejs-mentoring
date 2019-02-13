import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';

passport.use(new FacebookStrategy({
    callbackURL: 'http://localhost:8080/auth/facebook/callback',
    clientID: /* FACEBOOK_APP_ID */'2292029254389675',
    clientSecret: /* FACEBOOK_APP_SECRET */'9fab1e039ee9865eea433b4b19e3f585',
},
    (accessToken, refreshToken, profile, done) => {
        /* User.findOrCreate(..., function (err, user) {
            if (err) { return done(err); }
            done(null, user);
        }); */
        let a = accessToken;
        let b = refreshToken;
        let c = profile;
    },
));
