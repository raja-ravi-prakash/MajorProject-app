import { Schema, Document, Model, model, Types } from "mongoose";

export interface IPrimaryEntity extends Document {
    _id: string,
    file: string,
    user: string
}

export const PrimaryEntitySchema = new Schema({
    file: { type: String },
    user: { type: String }
});

export const PrimaryEntity: Model<IPrimaryEntity> = model<IPrimaryEntity>('PrimaryEntity', PrimaryEntitySchema);