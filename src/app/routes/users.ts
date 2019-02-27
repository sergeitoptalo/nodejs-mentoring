import express from 'express';
import fs from 'fs';
import userController from '../controllers/user.controller';
import { IUser } from '../models/user.model';

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    userController
        .getAllUsers()
        .then((users: IUser[]) => {
            res.status(200).json(users);
        })
        .catch((error: Error) => {
            res.status(404).json({ error });
        });
});

export default userRouter;
