import db from '../db/models';
import { IUser } from '../models/user.model';

class UserController {
    public getAllUsers() {
        return db.User.findAll()
            .then((users: IUser[]) => users)
            .catch((error: Error) => error);
    }

    public getUserByEmail(email: string) {
        return db.User.findOne(({ where: { email } }))
            .then((user: IUser) => user)
            .catch((error: any) => error);
    }
}

export default new UserController();
