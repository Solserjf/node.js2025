import path from "node:path";

import { model, Schema } from "mongoose";

import { RoleEnum } from "../enums/role.enum";
import { IUser } from "../interfaces/user.interface";

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        surname: { type: String, required: true },
        age: { type: Number, required: true },
        avatar: { type: String, default: "" },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {
            enum: RoleEnum,
            type: String,
            required: true,
            default: RoleEnum.USER,
        },
        isDeleted: { type: Boolean, default: false },
        isVerified: { type: Boolean, default: false },
        isActive: { type: Boolean, default: false },
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform: (doc, ret) => {
                delete ret.password;
                if (ret.avatar) {
                    ret.avatar = `/media/${path.basename(ret.avatar)}`;
                }
                return ret;
            },
        },
    },
);

export const User = model<IUser>("user", UserSchema);
