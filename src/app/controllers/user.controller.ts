import fs from 'fs';
import { promisify } from 'util';
import { userDataPath } from '../config/constants';

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
}

export default new UserController();
