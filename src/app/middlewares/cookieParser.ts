import express, { NextFunction, Request, Response } from 'express';

const cookieParser = (): any => (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const cookies = req.headers.cookie;

    req.cookies = cookies;
    next();
};

export default cookieParser;
