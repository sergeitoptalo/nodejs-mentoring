import express, { NextFunction } from 'express';

const queryParser = (): any => (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    next();
};

export default queryParser;
