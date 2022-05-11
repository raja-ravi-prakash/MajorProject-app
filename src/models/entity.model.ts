import { Schema, Document, Model, model, Types, SchemaTypes } from "mongoose"

export enum EntityType {
    FILE="FILE",
    FOLDER="FOLDER"
}

export interface IEntity extends Document{
    type: EntityType,
    name: string,
    parent: string,
    user: string,
    userGroups:string[],
    primaryEntity: string[]
}

const EntitySchema = new Schema({
    type: { type: EntityType, require: true },
    name: { type: String, require: true },
    parent: { type:String , require: true },
    file: { type: String, require: true },
    user: { type: String, require: true },
    userGroups:[{type:SchemaTypes.ObjectId, ref:'UserGroup'}],
    primaryEntity: [{ type: Schema.Types.ObjectId, ref: 'PrimaryEntity' }]
});

export const Entity: Model<IEntity> = model<IEntity>('Entity', EntitySchema);