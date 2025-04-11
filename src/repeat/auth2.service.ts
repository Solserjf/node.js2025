import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { IAuth } from "../interfaces/auth.interface";
import { ITokenPair } from "../interfaces/token.interface";
import { IUser, IUserCreateDTO } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "../services/password.service";
import { tokenService } from "../services/token.service";
import { userService } from "../services/user.service";

class Auth2Service {
    public async signUp(
        user: IUserCreateDTO,
    ): Promise<{ user: IUser; tokens: ITokenPair }> {
        await userService.isEmailUnique(user.email);
        const password = await passwordService.hashPassword(user.password);
        const newUser = await userRepository.create({ ...user, password });
        const tokens = tokenService.generateTokens({
            role: newUser.role,
            userId: newUser._id,
        });
        return {
            user: newUser,
            tokens,
        };
    }
    public async signIn(
        dto: IAuth,
    ): Promise<{ user: IUser; tokens: ITokenPair }> {
        const user = await userRepository.getByEmail(dto.email);
        if (!user) {
            throw new ApiError(
                "invalid password or email",
                StatusCodesEnum.UNAUTHORIZED,
            );
        }
        const isValidPassword = await passwordService.comparePassword(
            user.password,
            dto.password,
        );
        if (!isValidPassword) {
            throw new ApiError(
                "invalid password or email",
                StatusCodesEnum.UNAUTHORIZED,
            );
        }

        const tokens = tokenService.generateTokens({
            role: user.role,
            userId: user._id,
        });
        return {
            user,
            tokens,
        };
    }
}
export const auth2Service = new Auth2Service();
