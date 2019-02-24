import fs from 'fs';
import { promisify } from 'util';
import { userDataPath } from '../config/constants';
import { IUser } from '../models/user.model';
import db from '../db/models';

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
        return new Promise((resolve, reject) => {
            db.User.findOne(({ where: { email } }))
                .then((user: IUser) => {
                    resolve(user);
                })
                .catch((error: any) => {
                    reject(error);
                })
        })
    }
}

export default new UserController();
