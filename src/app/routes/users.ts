import express from 'express';
import fs from 'fs';

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    const readable = fs.createReadStream('./src/app/data/users.json');
    readable.pipe(res);
});

export default userRouter;
