import { Schema, Document, Model, model, Types } from "mongoose"

export enum EntityType {
    FILE="FILE",
    FOLDER="FOLDER"
}

export interface IEntity extends Document{
    type: EntityType,
    name: string,
    parent: string,
    user: string
}

const EntitySchema = new Schema({
    type: { type: EntityType, require: true },
    name: { type: String, require: true },
    parent: { type: Schema.Types.ObjectId, require: true, ref: 'Entity' },
    file: { type: String, require: true },
    user: { type: String, require: true }
});

export const Entity: Model<IEntity> = model<IEntity>('Entity', EntitySchema);