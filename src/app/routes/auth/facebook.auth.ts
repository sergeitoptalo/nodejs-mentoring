import express from 'express';
import passport from 'passport';
import authController from '../../controllers/auth.controller';

const facebookAuthRouter = express.Router();

facebookAuthRouter.get('/', passport.authenticate('facebook'));

facebookAuthRouter.get('/callback', passport.authenticate('facebook'),
    (req, res) => {
        authController.authenticateUser(req.user)
            .then((authenticatedUser) => {
                res.status(200).json(authenticatedUser);
            })
            .catch((error) => {
                res.status(404).json({ message: 'Not found' });
            });
    });

export default facebookAuthRouter;
