import express from 'express';

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    res.json({ status: 'user ok' });
});

export default userRouter;
