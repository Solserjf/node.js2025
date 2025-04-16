import { config } from "../configs/configs";
import { emailConstants } from "../constants/email.constants";
import { ActionTokenType } from "../enums/action-token-type.enum";
import { EmailEnum } from "../enums/email.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { IAuth } from "../interfaces/auth.interface";
import { ITokenPair } from "../interfaces/token.interface";
import { IUser, IUserCreateDTO } from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";
import { userService } from "./user.service";

class AuthService {
    public async signUp(
        user: IUserCreateDTO,
    ): Promise<{ user: IUser; tokens: ITokenPair }> {
        await userService.isEmailUnique(user.email);
        const password = await passwordService.hashPassword(user.password);
        const newUser = await userRepository.create({
            ...user,
            password,
        });
        const tokens = tokenService.generateTokens({
            userId: newUser._id,
            role: newUser.role,
        });
        await tokenRepository.create({ ...tokens, userId: newUser._id });
        const token = tokenService.generateActionTokens(
            { userId: newUser._id, role: newUser.role },
            ActionTokenType.ACTIVATE,
        );
        await emailService.sendEmail(
            newUser.email,
            emailConstants[EmailEnum.ACTIVATE],
            {
                name: newUser.name,
                url: `${config.FRONTEND_URL}/activate/${token}`,
            },
        );
        return { user: newUser, tokens };
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
        const IsValidPassword = await passwordService.comparePassword(
            dto.password,
            user.password,
        );
        if (!user.isActive) {
            throw new ApiError(
                "Account is not active",
                StatusCodesEnum.FORBIDDEN,
            );
        }
        if (!IsValidPassword) {
            throw new ApiError(
                "invalid email or password",
                StatusCodesEnum.UNAUTHORIZED,
            );
        }
        const tokens = tokenService.generateTokens({
            userId: user._id,
            role: user.role,
        });
        await tokenRepository.create({ ...tokens, userId: user._id });

        return { user, tokens };
    }
    public async activate(token: string) {
        const { userId } = tokenService.verifyTokens(
            token,
            ActionTokenType.ACTIVATE,
        );
        return await userService.updateById(userId, { isActive: true });
    }
    public async recoveryPasswordRequest(user: IUser): Promise<void> {
        const token = tokenService.generateActionTokens(
            {
                userId: user._id,
                role: user.role,
            },
            ActionTokenType.RECOVERY,
        );
        const url = `${config.FRONTEND_URL}/recovery/${token}`;
        await emailService.sendEmail(
            user.email,
            emailConstants[EmailEnum.RECOVERY],
            { url },
        );
    }
    public async recoveryPassword(
        token: string,
        password: string,
    ): Promise<IUser> {
        const { userId } = tokenService.verifyTokens(
            token,
            ActionTokenType.RECOVERY,
        );
        const hashedPassword = await passwordService.hashPassword(password);
        return await userService.updateById(userId, {
            password: hashedPassword,
        });
    }
}

export const authService = new AuthService();
