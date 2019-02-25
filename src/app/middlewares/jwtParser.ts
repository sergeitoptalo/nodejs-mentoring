import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    if (req.path.includes('auth')) {
        next();
    } else {
        let token: string = req.headers['x-access-token'] as string;

        if (token) {
            jwt.verify(token, 'secret', (error: any, decoded: any) => {
                if (error) {
                    res.status(405).json();
                } else {
                    next();
                }
            });
        } else {
            res.status(403).json({ success: false, message: 'No token provided' });
        }
    }
};
