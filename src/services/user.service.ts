import {IUser, IUserDTO} from "../interfaces/user.interface";
import {userRepository} from "../repositories/user.repository";


class UserService {
     async getAll(): Promise<IUser[]> {
        return  await userRepository.getAll();
     }
    async create(user: IUserDTO): Promise<IUser> {
       return  await userRepository.create(user);
    }
    async getById(id: string): Promise<IUser> {
        return await userRepository.getById(id);
    }
    async updateById(id: string, user: IUserDTO): Promise<IUser> {
        return await userRepository.updateById(id, user);
    }
    async deleteById(id: string): Promise<IUser> {
        return await userRepository.deleteById(id);
    }

}

export const userService = new UserService();