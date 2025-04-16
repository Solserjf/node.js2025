import jwt from "jsonwebtoken";

import { config } from "../configs/configs";
import { ActionTokenType } from "../enums/action-token-type.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { TokenTypeEnum } from "../enums/token-type.enum";
import { ApiError } from "../errors/api.error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import { tokenRepository } from "../repositories/token.repository";

class TokenService {
    public generateTokens(payload: ITokenPayload): ITokenPair {
        const accessToken = jwt.sign(payload, config.ACCESS_TOKEN_SECRET, {
            expiresIn: config.ACCESS_TOKEN_LIFETIME,
        });
        const refreshToken = jwt.sign(payload, config.REFRESH_TOKEN_SECRET, {
            expiresIn: config.REFRESH_TOKEN_LIFETIME,
        });
        return {
            accessToken,
            refreshToken,
        };
    }

    public verifyTokens(
        token: string,
        type: TokenTypeEnum | ActionTokenType,
    ): ITokenPayload {
        try {
            let secret: string;
            switch (type) {
                case "access":
                    secret = config.ACCESS_TOKEN_SECRET;
                    break;
                case "refresh":
                    secret = config.REFRESH_TOKEN_SECRET;
                    break;
                case "activate":
                    secret = config.ACTIVATE_TOKEN_SECRET;
                    break;
                case "recovery":
                    secret = config.RECOVERY_TOKEN_SECRET;
                    break;

                default:
                    throw new ApiError(
                        "invalid token`s type",
                        StatusCodesEnum.BED_REQUEST,
                    );
            }
            return jwt.verify(token, secret) as ITokenPayload;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            throw new ApiError(
                "invalid token TOKENSERVICE",
                StatusCodesEnum.UNAUTHORIZED,
            );
        }
    }
    public async isTokenExist(
        token: string,
        type: TokenTypeEnum.ACCESS | TokenTypeEnum.REFRESH,
    ): Promise<boolean> {
        const iTokenPromise = tokenRepository.findByParams({ [type]: token });
        return !!iTokenPromise;
    }
    public generateActionTokens(
        payload: ITokenPayload,
        type: ActionTokenType,
    ): string {
        let secret: string;
        let expiresIn: any;
        switch (type) {
            case ActionTokenType.ACTIVATE:
                secret = config.ACTIVATE_TOKEN_SECRET;
                expiresIn = config.ACTIVATE_TOKEN_LIFETIME;
                break;
            case ActionTokenType.RECOVERY:
                secret = config.RECOVERY_TOKEN_SECRET;
                expiresIn = config.RECOVERY_TOKEN_LIFETIME;
                break;
            default:
                throw new ApiError("Invalid action token type", 400);
        }
        return jwt.sign(payload, secret, { expiresIn });
    }
}

export const tokenService = new TokenService();
