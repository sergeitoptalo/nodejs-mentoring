import jwt from 'jsonwebtoken';
import { statusCode } from '../config/constants';
import { IUser } from '../models/user.model';

class AuthController {
    public authenticateUser(user: IUser) {
        return new Promise((resolve, reject) => {
            if (user) {
                let payload = {
                    sub: user.email,
                };

                let token = jwt.sign(payload, 'secret'/* , { expiresIn: 10 } */);

                const response = {
                    code: statusCode.success,
                    data: {
                        user: {
                            email: user.email,
                            username: user.username,
                        },
                    },
                    message: 'OK',
                    token,
                };

                resolve(response);
            } else {
                const response = {
                    code: statusCode.notFound,
                    message: 'Not Found',
                };

                reject(response);
            }
        });
    }
}

export default new AuthController();
