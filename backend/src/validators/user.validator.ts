import joi from "joi";

import { RegexEnum } from "../enums/regex.enum";
import { UserQueryOrderEnum } from "../enums/user-query-order.enum";

export class UserValidator {
    private static Username = joi.string().regex(RegexEnum.NAME);
    private static surname = joi.string().regex(RegexEnum.NAME);
    private static age = joi.number().min(2).max(100);
    private static email = joi.string().email().trim();
    private static password = joi.string().regex(RegexEnum.PASSWORD);

    public static create = joi.object({
        password: this.password.required(),
        email: this.email.required(),
        name: this.Username.required(),
        surname: this.surname.required(),
        age: this.age.required(),
    });
    public static update = joi.object({
        name: this.Username.required(),
        surname: this.surname.required(),
        age: this.age.required(),
    });
    public static query = joi.object({
        pageSize: joi.number().min(1).max(100).default(10),
        page: joi.number().min(1).default(1),
        search: joi.string().trim(),
        order: joi
            .string()
            .valid(
                ...Object.values(UserQueryOrderEnum),
                ...Object.values(UserQueryOrderEnum).map((item) => `-${item}`),
            ),
    });
}

//export const userValidator = new UserValidator();//такий варіант експорту тут не працює, тому що у класі UserValidator використовуються статичні методи, а з ними екземпляри класу не працюють!!!
