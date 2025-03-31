import {IUser, IUserDTO} from "../interfaces/user.interface";
import {userRepository} from "../repositories/user.repository";

class UserService {
    public  getAll(): Promise<IUser[]> {
        return  userRepository.getAll();
    }
    public  create(user: IUserDTO): Promise<IUser> {
        return  userRepository.create(user);
    }
    public  getById(id: string): Promise<IUser> {
        return  userRepository.getById(id);
    }
}
export const userService = new UserService();