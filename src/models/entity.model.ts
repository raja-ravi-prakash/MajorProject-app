import { Schema, Document, Model, model, Types } from "mongoose"

export enum EntityType {
    FILE="FILE",
    FOLDER="FOLDER"
}

export interface IEntity extends Document{
    type: EntityType,
    name: string,
    parent: string,
    user: string,
    primaryEntity: string[]
}

const EntitySchema = new Schema({
    type: { type: EntityType, require: true },
    name: { type: String, require: true },
    parent: { type:String , require: true },
    file: { type: String, require: true },
    user: { type: String, require: true },
    primaryEntity: [{ type: Schema.Types.ObjectId }]
});

export const Entity: Model<IEntity> = model<IEntity>('Entity', EntitySchema);