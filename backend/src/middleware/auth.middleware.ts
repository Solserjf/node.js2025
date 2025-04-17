import { NextFunction, Request, Response } from "express";

import { RoleEnum } from "../enums/role.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { TokenTypeEnum } from "../enums/token-type.enum";
import { ApiError } from "../errors/api.error";
import { IRefresh, ITokenPayload } from "../interfaces/token.interface";
import { tokenService } from "../services/token.service";
import { userService } from "../services/user.service";

class AuthMiddleware {
    public async checkAccessToken(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const authorizationHeaders = req.headers.authorization;
            if (!authorizationHeaders) {
                //чи є заголовок взагалі
                throw new ApiError(
                    "No token provided",
                    StatusCodesEnum.UNAUTHORIZED,
                );
            }
            const accessToken = authorizationHeaders.split(" ")[1];
            if (!accessToken) {
                //чи у цьому заголовку є сам токен після Bearer.
                throw new ApiError(
                    "No token provided",
                    StatusCodesEnum.UNAUTHORIZED,
                );
            }
            const tokenPayload = tokenService.verifyTokens(
                //Ця функція перевіряє, що токен справжній, не прострочений і підписаний правильним секретом.
                // Але вона не перевіряє, чи цей токен не відкликаний (revoke) або видалений з бази.
                accessToken,
                TokenTypeEnum.ACCESS,
            );
            const isTokenExists = await tokenService.isTokenExist(
                accessToken,
                TokenTypeEnum.ACCESS,
            );
            if (!isTokenExists) {
                // Тобто це перевірка, що токен дійсно дозволений до використання у системі(чи токен не відкликаний (revoke) або видалений з бази).
                throw new ApiError(
                    "No token provided",
                    StatusCodesEnum.UNAUTHORIZED,
                );
            }

            const isActive = await userService.checkIsActive(
                tokenPayload.userId,
            );

            if (!isActive) {
                throw new ApiError(
                    "ACCOUNT IS NOT ACTIVE",
                    StatusCodesEnum.FORBIDDEN,
                );
            }

            // res.locals — це об’єкт, який дозволяє передати дані з middleware в наступні обробники.
            req.res.locals.tokenPayload = tokenPayload;
            // Тобто locals — це просто тимчасове сховище для передачі даних між middleware та контролером.
            // за доп. next() Переходимо до наступного middleware/контролера
            next();
        } catch (e) {
            next(e);
        }
    }
    public async checkRefreshToken(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { refreshToken } = req.body as IRefresh;
            if (!refreshToken) {
                throw new ApiError(
                    "No refresh token provided",
                    StatusCodesEnum.FORBIDDEN,
                );
            }
            const tokenPayload = tokenService.verifyTokens(
                refreshToken,
                TokenTypeEnum.REFRESH,
            );
            const isTokenExist = await tokenService.isTokenExist(
                refreshToken,
                TokenTypeEnum.REFRESH,
            );
            if (!isTokenExist) {
                throw new ApiError(
                    "invalid token AUTHMIDDLEWARE",
                    StatusCodesEnum.FORBIDDEN,
                );
            }
            req.res.locals.tokenPayload = tokenPayload;
            next();
        } catch (e) {
            next(e);
        }
    }
    public isAdmin(req: Request, res: Response, next: NextFunction): void {
        try {
            const { role } = req.res.locals.tokenPayload as ITokenPayload;
            if (role !== RoleEnum.ADMIN) {
                throw new ApiError(
                    "No has permissions",
                    StatusCodesEnum.FORBIDDEN,
                );
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}
export const authMiddleware = new AuthMiddleware();
