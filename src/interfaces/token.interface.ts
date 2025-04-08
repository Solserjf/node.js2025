import { RoleEnum } from "../enums/role.enum";
import { IBase } from "./base.interface";

interface IToken extends IBase {
    _id: string;
    accessToken: string;
    refreshToken: string;
    userId: string;
}

interface ITokenPayload {
    role: RoleEnum;
    userId: string;
}

type ITokenPair = Pick<IToken, "accessToken" | "refreshToken">;

export { IToken, ITokenPair, ITokenPayload };
