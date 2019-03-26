const jwt = require('jsonwebtoken');

class AuthController {
    authenticateUser(user) {
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
