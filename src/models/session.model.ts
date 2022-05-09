import { Document, model, Model, Schema } from "mongoose"
import * as moment from 'moment';

export interface ISession extends Document{
    username: string,
    payload: string
    expiry: Date
}

export const SessionSchema = new Schema({
    username: { type: String, unique: true, require: true },
    payload: { type: String, unique: true, require: true },
    expiry: { type: Date , default: moment().add(6, 'hours')}
})

export const Session: Model<ISession> = model<ISession>('Session', SessionSchema);