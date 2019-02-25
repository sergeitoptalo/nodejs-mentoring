import express from 'express';
import passport from 'passport';
import authController from '../../controllers/auth.controller';
import facebookAuthRoutes from './facebook.auth';
import googleAuthRoutes from './google.auth';
import twitterAuthRoutes from './twitter.auth';

const authRouter = express.Router();

authRouter.post('/', passport.authenticate(
    'local',
),
    (req, res) => {
        authController.authenticateUser(req.user)
            .then((authenticatedUser) => {
                res.status(200).json(authenticatedUser);
            })
            .catch((error) => {
                res.status(404).json({ message: 'Not found' });
            });
    });

authRouter.use('/facebook', facebookAuthRoutes);
authRouter.use('/google', googleAuthRoutes);
authRouter.use('/twitter', twitterAuthRoutes);

export default authRouter;
