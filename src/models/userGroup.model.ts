import { Document, model, Model, Schema, SchemaTypes } from "mongoose";

export enum PERMISSIONS {
    READ = "READ",
    WRITE = "WRITE",
    DELETE = "DELETE"
}

export interface IUserGroup extends Document{
    users: string[],
    permissions: PERMISSIONS[]
}

export const UserGroupSchema = new Schema({
    users: [{ type: SchemaTypes.ObjectId, require: true, ref: 'User'}],
    permissions: [{ type: PERMISSIONS, require: true }]
});

export const UserGroup: Model<IUserGroup> = model<IUserGroup>('UserGroup', UserGroupSchema);
