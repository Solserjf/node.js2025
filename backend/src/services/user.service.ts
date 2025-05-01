import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
import {
    IUser,
    IUserCreateDTO,
    IUserQuery,
} from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
    public async getAll(query: IUserQuery): Promise<IPaginatedResponse<IUser>> {
        const dataFromDb = await userRepository.getAll(query);
        let data, totalItems;
        if (dataFromDb.length) {
            data = dataFromDb[0].data;
            totalItems = dataFromDb[0].totalItems;
        } else {
            data = [];
            totalItems = 0;
        }

        const totalPages = Math.ceil(totalItems / query.pageSize);
        return {
            totalItems,
            totalPages,
            prevPage: !!(query.page - 1),
            nextPage: query.page + 1 <= totalPages,
            data,
        };
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
    public async updateById(id: string, user: Partial<IUser>): Promise<IUser> {
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
    public getByEmail(email: string): Promise<IUser> {
        return userRepository.getByEmail(email);
    }
    public async checkIsActive(id: string): Promise<boolean> {
        const user = await this.getById(id);
        return user.isActive;
    }
    public blockUser(id: string): Promise<IUser> {
        return userRepository.blockUser(id);
    }
    public unBlockUser(id: string): Promise<IUser> {
        return userRepository.unBlockUser(id);
    }
}
export const userService = new UserService();
