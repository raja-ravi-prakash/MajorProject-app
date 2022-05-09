import { User } from "../models/user.model";
import { enc, SHA256 } from 'crypto-js';
import { Session } from "../models/session.model";
import config from '../../config';
import { CryptoHelper } from "../../crypto";
import { Entity, EntityType } from "../models/entity.model";

export function createUser(username: string, password: string, name: string, email: string){
    return Promise.all([
        User.create({
            username: username,
            password: SHA256(password).toString(enc.Base64),
            name: name,
            email: email
        }),
        Entity.create({
            parent: "C15-BACKEND",
            name: "~$",
            type: EntityType.FOLDER,
            user: username
        })
    ]);
}

export async function loginUser(username: string, password: string){
    let user = await User.find({
        username: username
    }).exec();

    if(user.length == 0)
        return {
            message: 'User Not Found',
            data: null,
            success: false
        };
    
    else if(user[0].password != SHA256(password).toString(enc.Base64))
        return {
            message: 'Wrong Password!',
            data: null,
            success: false
        };
    
    else {
        let tokenPayload: any = await Session.find({
            username: user[0].username,
        });
        let cryptohelper = new CryptoHelper(config.salt, config.secretKey, config.iv);
        if(tokenPayload.length == 0)
            tokenPayload = await Session.create({
                username: user[0].username,
                payload: cryptohelper.encrypt(JSON.stringify(user[0].toJSON()))
            });
        else 
            tokenPayload = tokenPayload[0];
        let rootEntity = await Entity.findOne({
            user: username,
            name: "~$"
        }).exec();
        return {
            message: 'User Login Successfull',
            success: true,
            data: {
                token: tokenPayload.toJSON(),
                rootEntity: rootEntity
            }
        };
    }
}