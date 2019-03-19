import { NextFunction, Request, Response } from 'express';

export const modifiedDateSetter = (req: Request, res: Response, next: NextFunction) => {
    if (['post', 'put'].includes(req.method.toLowerCase())) {
        req.body.lastModifiedDate = new Date();
    }

    next();
};
