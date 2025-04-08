import joi from "joi";

import { RegexEnum } from "../enums/regex.enum";

export class UserValidator {
    private static name = joi.string().regex(RegexEnum.NAME);
    private static surname = joi.string().regex(RegexEnum.NAME);
    private static age = joi.number().min(2).max(100);
    private static email = joi.string().email().trim();
    private static password = joi.string().regex(RegexEnum.PASSWORD);

    public static create = joi.object({
        password: this.password.required(),
        email: this.email.required(),
        name: this.name.required(),
        surname: this.surname.required(),
        age: this.age.required(),
    });
    public static update = joi.object({
        name: this.name.required(),
        surname: this.surname.required(),
        age: this.age.required(),
    });
}

//export const userValidator = new UserValidator();//такий варіант експорту тут не працює, тому що у класі UserValidator використовуються статичні методи, а з ними екземпляри класу не працюють!!!
