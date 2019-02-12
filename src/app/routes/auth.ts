import express from 'express';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { statusCode, userDataPath } from '../config/constants';
import { IUser } from '../models/user.model';

const authRouter = express.Router();

authRouter.post('/', (req, res) => {
    const readFileAsync = promisify(fs.readFile);
    let userIsValid = false;
    let validatedUser = null;

    const userData = readFileAsync(userDataPath)
        .then((users) => {
            validatedUser = JSON.parse(users.toString())
                .filter((user: IUser) =>
                    user.email === req.body.login && user.password === req.body.password)[0];

            if (validatedUser) {
                let payload = {
                    sub: validatedUser.email,
                };

                let token = jwt.sign(payload, 'secret', { expiresIn: 7200 });
                const response = {
                    code: statusCode.success,
                    data: {
                        user: {
                            email: validatedUser.email,
                            username: validatedUser.username,
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
        })
        .catch((error) => {
            res.end('Please try again later');
        });
});

export default authRouter;
