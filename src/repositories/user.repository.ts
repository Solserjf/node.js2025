import { IUser, IUserCreateDTO } from "../interfaces/user.interface";
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
    public updateById(userId: string, user: Partial<IUser>): Promise<IUser> {
        return User.findByIdAndUpdate(userId, user, { new: true });
    }
    public deleteById(id: string): Promise<IUser> {
        return User.findByIdAndDelete(id);
    }
    public getByEmail(email: string): Promise<IUser> {
        return User.findOne({ email });
    }
    public blockUser(id: string): Promise<IUser> {
        return User.findByIdAndUpdate(id, { isActive: false }, { new: true });
    }
    public unBlockUser(id: string): Promise<IUser> {
        return User.findByIdAndUpdate(id, { isActive: true }, { new: true });
    }
}
export const userRepository = new UserRepository();
