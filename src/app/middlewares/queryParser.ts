import express, { NextFunction } from 'express';

const queryParser = (): any => (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    req.parsedQuery = req.query;
    next();
};

export default queryParser;
