import jwt from "jsonwebtoken";

import { config } from "../configs/configs";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";

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
        type: "access" | "refresh",
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
                default:
                    throw new ApiError(
                        "invalid token`s type",
                        StatusCodesEnum.BED_REQUEST,
                    );
            }
            return jwt.verify(token, secret) as ITokenPayload;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            throw new ApiError("invalid token", StatusCodesEnum.UNAUTHORIZED);
        }
    }
}

export const tokenService = new TokenService();
