import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import {
    IUser,
    IUserCreateDTO,
    IUserUpdateDTO,
} from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
    public getAll(): Promise<IUser[]> {
        return userRepository.getAll();
    }
    public create(user: IUserCreateDTO): Promise<IUser> {
        return userRepository.create(user);
    }
    public async getById(id: string): Promise<IUser> {
        const user = await userRepository.getById(id);

        if (!user) {
            throw new ApiError("user not found", StatusCodesEnum.NOT_FOUND);
        }
        return user;
    }
    public async updateById(id: string, user: IUserUpdateDTO): Promise<IUser> {
        const data = await userRepository.getById(id);
        if (!data) {
            throw new ApiError("user not found", StatusCodesEnum.NOT_FOUND);
        }
        return await userRepository.updateById(id, user);
    }
    public async deleteById(id: string): Promise<void> {
        const data = await userRepository.getById(id);
        if (!data) {
            throw new ApiError("user not found", StatusCodesEnum.NOT_FOUND);
        }
        await userRepository.deleteById(id);
    }
    public async isEmailUnique(email: string): Promise<void> {
        const newUser = await userRepository.getByEmail(email);
        if (newUser) {
            throw new ApiError(
                "Such user already exists",
                StatusCodesEnum.BED_REQUEST,
            );
        }
    }
}
export const userService = new UserService();
