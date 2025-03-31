import {User} from "../models/user.model";
import {IUser, IUserDTO} from "../interfaces/user.interface";

class UserRepository {
    public  getAll(): Promise<IUser[]> {
        return User.find();
    }
    public create(user: IUserDTO): Promise<IUser> {
        return User.create(user);
    }
    public getById(id: string): Promise<IUser> {
        return User.findById(id);
    }
    public updateById(id: string, user: IUserDTO): Promise<IUser> {
        return User.findByIdAndUpdate(id, user);
    }
    public deleteById(id: string): Promise<IUser> {
        return User.findByIdAndDelete(id);
    }
}
export const userRepository = new UserRepository();