import { Schema, Document, Model, model, Types } from "mongoose";
import { IEntity } from './entity.model';

export interface IPrimaryEntity extends Document {
    _id: string,
    entity: string,
    user: string
}

export const PrimaryEntitySchema = new Schema({
    entity: { type: Schema.Types.ObjectId, ref: 'Entity', require: true },
    user: { type: String }
});

export const PrimaryEntity: Model<IPrimaryEntity> = model<IPrimaryEntity>('PrimaryEntity', PrimaryEntitySchema);