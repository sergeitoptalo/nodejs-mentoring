import express from 'express';
import passport from 'passport';
import authController from '../controllers/auth.controller';

const authRouter = express.Router();

authRouter.post('/', passport.authenticate(
    'local',
    /*{ session: false } */
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

authRouter.get('/facebook', passport.authenticate('facebook'),
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
