import {Schema, model} from "mongoose";//імпортуємо схему з бібліотеки монгуз
import {IUser} from "../interfaces/user.interface";

const userSchema = new Schema({
        name: {type: String, required: true},
        surname: {type: String, required: true},
        age: {type: Number, required: true},
    },
    {timestamps: true, versionKey: false},//timestamps — щоб не дописувати флаги  at — у created/updated
);

export const User = model<IUser>("user", userSchema);
////"user" - так буде називатись наш об'єкт в mongo.db
// Тепер через цей об’єкт  user ми зможемо керувати нашою БД — щось створювати, вибирати(db.user. і щось далі)