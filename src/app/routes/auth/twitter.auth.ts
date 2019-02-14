import express from 'express';
import passport from 'passport';
import authController from '../../controllers/auth.controller';

const twitterAuthRouter = express.Router();

twitterAuthRouter.get('/', passport.authenticate('twitter'));

twitterAuthRouter.get('/callback', passport.authenticate('twitter'),
    (req, res) => {
        authController.authenticateUser(req.user)
            .then((authenticatedUser) => {
                res.status(200).json(authenticatedUser);
            })
            .catch((error) => {
                res.status(404).json({ message: 'Not found' });
            });
    });

export default twitterAuthRouter;
