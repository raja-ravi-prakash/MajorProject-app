import { Document, model, Model, Schema } from "mongoose"

export interface IUser extends Document{
    username: string,
    password: string,
    name: string,
    email: string
}

export const UserSchema = new Schema({
    username: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    name: { type: String, require: true },
    email: { type: String, unique: true, require: true },
})

export const User: Model<IUser> = model<IUser>('User', UserSchema);