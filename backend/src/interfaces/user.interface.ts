import { RoleEnum } from "../enums/role.enum";

export interface IUser {
    _id: string;
    name: string;
    surname: string;
    age: number;
    avatar: string;
    email: string;
    password: string;
    role: RoleEnum;
    isDeleted: boolean;
    isVerified: boolean;
    isActive: boolean;
}

type IUserCreateDTO = Pick<
    IUser,
    "email" | "password" | "name" | "surname" | "age"
>;
type IUserUpdateDTO = Pick<IUser, "name" | "surname" | "age">;
export type { IUserCreateDTO, IUserUpdateDTO };
