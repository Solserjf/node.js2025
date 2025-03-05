import {users} from "../db/users.db";
import {NextFunction, Request, Response} from "express";

interface IUser {
    name: string;
    age: number;
    gender: string;
}

class UserController {
    // public async findAll(req: Request, res: Response, next: NextFunction): Promise<Response<IUser[]>> {
    //    try {
    //         throw new Error("something went wrong");
    //         // return  res.json(users);
    //    } catch (e) {
    //             return  res.json({
    //             message: e.message,
    //             status: 400,
    //        });
    //    }

    public async findAll(req: Request, res: Response, next: NextFunction): Promise<Response<IUser[]>> {
        try {
            throw new Error("something went wrong");
            // return res.json(users);
        } catch (e: unknown) {
            if (e instanceof Error) {
                return res.json({
                    message: e.message,
                    status: 400,
                });
            }
            return res.json({
                message: "Unknown error",
                status: 400,
            });
        }
    }

    public create(req: Request, res: Response) {
        const users = req.body;
        users.push(users);
        res.status(201).json({message: 'users added successfully'});
    }
    public async updateById(req: Request, res: Response) {
        const { id } = req.params;
        const updatedHubkaBob = req.body;
        users[+id] = updatedHubkaBob;
        res.status(200).json({message: 'users updated',
            data: users[+id]});
    }
    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        users.splice(+id, 1);
        res.status(200).json({message: 'users deleted'});
    }
}

export const userController = new UserController();
