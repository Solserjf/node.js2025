import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { ITokenPayload } from "../interfaces/token.interface";
import { IUserUpdateDTO } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await userService.getAll();
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const data = await userService.getById(id);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    // public async create(req: Request, res: Response) {
    //     const user = req.body as IUserCreateDTO;
    //     const data = await userService.create(user);
    //     res.status(StatusCodesEnum.CREATED).json(data);
    // }

    public async updateById(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.body as IUserUpdateDTO;
            const id = req.params.id;
            const data = await userService.updateById(id, user);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            await userService.deleteById(id);
            res.status(StatusCodesEnum.NO_CONTENT).end();
        } catch (e) {
            next(e);
        }
    }
    public async blockUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id: userId } = req.params;
            const { userId: myId } = req.res.locals
                .tokenPayload as ITokenPayload;
            if (userId === myId) {
                throw new ApiError(
                    "Has no permitted",
                    StatusCodesEnum.FORBIDDEN,
                );
            }
            const user = await userService.blockUser(userId);
            res.status(StatusCodesEnum.OK).json(user);
        } catch (e) {
            next(e);
        }
    }
    public async unBlockUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id: userId } = req.params;
            const { userId: myId } = req.res.locals
                .tokenPayload as ITokenPayload;
            if (userId === myId) {
                throw new ApiError(
                    "Has no permitted",
                    StatusCodesEnum.FORBIDDEN,
                );
            }
            const user = await userService.unBlockUser(userId);
            res.status(StatusCodesEnum.OK).json(user);
        } catch (e) {
            next(e);
        }
    }
    public async uploadAvatar(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user = await userService.getById(id);

            if (!user) {
                throw new ApiError(
                    "user not found",
                    StatusCodesEnum.BED_REQUEST,
                );
            }

            if (!req.file) {
                throw new ApiError(
                    "No file uploaded",
                    StatusCodesEnum.BED_REQUEST,
                );
            }
            console.log(req.file.path, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            const data = await userService.updateById(id, {
                avatar: req.file.path,
            });
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();
