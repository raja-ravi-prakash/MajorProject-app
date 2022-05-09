import { Document, model, Model, Schema, SchemaTypes } from "mongoose";

export enum PERMISSIONS {
    READ = "READ",
    DELETE = "DELETE"
}

export interface IUserGroup extends Document{
    name:string,
    users: string[],
    permissions: string[],
    createdBy : string,
}

export const UserGroupSchema = new Schema({
    name:{type:String},
    users: [{ type: String, require: true}],
    permissions: [{ type: String, require: true }],
    createdBy : { type: String, require: true }
});

export const UserGroup: Model<IUserGroup> = model<IUserGroup>('UserGroup', UserGroupSchema);
