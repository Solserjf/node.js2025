import {NextFunction, Request, Response} from "express";
import {users} from "../db/users.db";

class UserMiddleware {
    public async findByIdOrThrow(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const user = users[+id];
            if(!user) {
                throw new Error("user not found");
            }
            next();
        } catch (e) {
            next(e);
        }

    }

}

export const userMiddleware = new UserMiddleware();


