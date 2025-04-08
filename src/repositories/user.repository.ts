import {
    IUser,
    IUserCreateDTO,
    IUserUpdateDTO,
} from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
    public getAll(): Promise<IUser[]> {
        return User.find();
    }
    public create(user: IUserCreateDTO): Promise<IUser> {
        return User.create(user);
    }
    public getById(id: string): Promise<IUser> {
        return User.findById(id);
    }
    public updateById(id: string, user: IUserUpdateDTO): Promise<IUser> {
        return User.findByIdAndUpdate(id, user);
    }
    public deleteById(id: string): Promise<IUser> {
        return User.findByIdAndDelete(id);
    }
    public getByEmail(email: string): Promise<IUser> {
        return User.findOne({ email });
    }
}
export const userRepository = new UserRepository();
