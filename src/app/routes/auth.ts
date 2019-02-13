import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { statusCode } from '../config/constants';

const authRouter = express.Router();

authRouter.post('/', passport.authenticate('local'/* , { session: false } */), (req, res) => {
    const user = req.user;

    if (user) {
        let payload = {
            sub: user.email,
        };
        let token = jwt.sign(payload, 'secret'/* , { expiresIn: 10 } */);

        const response = {
            code: statusCode.success,
            data: {
                user: {
                    email: user.email,
                    username: user.username,
                },
            },
            message: 'OK',
            token,
        };
        res.json(response);
    } else {
        const response = {
            code: statusCode.notFound,
            message: 'Not Found',
        };

        res.json(response);
    }
});

export default authRouter;
