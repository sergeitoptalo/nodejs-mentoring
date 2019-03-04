import express from 'express';
import fs from 'fs';
import userController from '../controllers/user.controller';
import { IUserDocument } from '../models/user.model';

const userRouter = express.Router();

userRouter.param('id', (req, res, next, id) => {
    req.body.userId = id;
    next();
});

userRouter.get('/', (req, res) => {
    userController
        .getAllUsers()
        .then((users: IUserDocument[]) => {
            res.status(200).json(users);
        })
        .catch((error: Error) => {
            res.status(404).json({ error });
        });
});

userRouter.delete('/:id', (req, res) => {
    userController
        .deleteUser(req.body.userId)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error: Error) => {
            res.status(404).json({ error });
        });
});

export default userRouter;
