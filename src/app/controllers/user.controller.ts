import fs from 'fs';
import { promisify } from 'util';
import { userDataPath } from '../config/constants';
import db from '../db/models';
import { IUser } from '../models/user.model';

class UserController {
    public getAllUsers() {
        const readFileAsync = promisify(fs.readFile);

        return new Promise((resolve, reject) => {
            readFileAsync(userDataPath)
                .then((users: Buffer) => {
                    resolve(JSON.parse(users.toString()));
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    public getUserByEmail(email: string) {
        db.User.findOne(({ where: { email } }))
            .then((user: IUser) => user)
            .catch((error: any) => error);
    }
}

export default new UserController();
