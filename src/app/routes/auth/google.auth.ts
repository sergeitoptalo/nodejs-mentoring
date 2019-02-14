import express from 'express';
import passport from 'passport';
import authController from '../../controllers/auth.controller';

const googleAuthRouter = express.Router();

googleAuthRouter.get('/',
    passport.authenticate('google', {
        scope:
            [
                'email',
                'profile',
            ],
    }));

googleAuthRouter.get('/callback',
    passport.authenticate('google', {
        scope:
            [
                'email',
                'profile',
            ],
    }),
    (req, res) => {
        authController.authenticateUser(req.user)
            .then((authenticatedUser) => {
                res.status(200).json(authenticatedUser);
            })
            .catch((error) => {
                res.status(404).json({ message: 'Not found' });
            });
    });

export default googleAuthRouter;
