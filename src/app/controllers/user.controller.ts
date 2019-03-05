import { MongoError } from 'mongodb';
import db from '../db/models';
import { IUser, IUserDocument } from '../models/user.model';
import { User } from '../mongoDb/models';

class UserController {
    public getAllUsers() {
        return User.find({})
            .then((users: IUserDocument[]) => users)
            .catch((error: MongoError) => error.message);
        /* return db.User.findAll()
            .then((users: IUser[]) => users)
            .catch((error: Error) => error); */
    }

    public getUserByEmail(email: string) {
        return User.findOne({ email })
            .then((user: IUserDocument) => user)
            .catch((error) => error);
        /* return db.User.findOne(({ where: { email } }))
            .then((user: IUser) => user)
            .catch((error: any) => error); */
    }

    public deleteUser(userId: string) {
        return User.deleteOne({ userId: parseInt(userId, 10) }, (error: MongoError) => {
            if (error) {
                return error;
            }
            return 'Removed';
        });
    }
}

export default new UserController();
