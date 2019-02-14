import express from 'express';
import passport from 'passport';
import authController from '../controllers/auth.controller';

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

authRouter.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

authRouter.get('/facebook/callback', passport.authenticate('facebook', { scope: ['email'] }),
    (req, res) => {
        authController.authenticateUser(req.user)
            .then((authenticatedUser) => {
                res.status(200).json(authenticatedUser);
            })
            .catch((error) => {
                res.status(404).json({ message: 'Not found' });
            });
    });

authRouter.get('/google',
    passport.authenticate('google', {
        scope:
            [
                'email',
                'profile',
            ],
    }));

authRouter.get('/google/callback',
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

authRouter.get('/twitter', passport.authenticate('twitter'));

authRouter.get('/twitter/callback', passport.authenticate('twitter'),
    (req, res) => {
        authController.authenticateUser(req.user)
            .then((authenticatedUser) => {
                res.status(200).json(authenticatedUser);
            })
            .catch((error) => {
                res.status(404).json({ message: 'Not found' });
            });
    });

export default authRouter;
