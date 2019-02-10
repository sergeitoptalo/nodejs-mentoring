import express, { NextFunction } from 'express';

const cookieParser = (): any => (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    const cookies = req.headers.cookie;

    req.parsedCookies = cookies;
    next();
};

export default cookieParser;
