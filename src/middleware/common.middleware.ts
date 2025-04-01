import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api.error";

class CommonMiddleware {
    public isValidate(key: string) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                // const { id } = req.params;//це теж працює, але якщо параметр буде називатися не id то нижчим рядком ми відхопимо і його
                const id = req.params[key];
                if (!isObjectIdOrHexString(id)) {
                    throw new ApiError(`${key}: ${id} Invalid id `, 400);
                }
                next();
            } catch (e) {
                next(e);
            }
        };
    }

    public validateBody(validator: ObjectSchema) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                req.body = await validator.validateAsync(req.body);
                next();
            } catch (e) {
                next(new ApiError(e.details[0].message, 400));
            }
        };
    }
}

export const commonMiddleware = new CommonMiddleware();
