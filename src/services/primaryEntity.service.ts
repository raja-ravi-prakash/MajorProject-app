import { PrimaryEntity } from "../models/primaryEntity.model";
import { Entity } from "../models/entity.model";

export function getPrimaryEntitiesByUser(user: string){
    return PrimaryEntity.find({
        user: user
    }).populate('entity').exec();
}

export function getEntitiesByPrimaryEntity(user: string, primaryEntityId: string){
    return Entity.find({
        user: user,
        primaryEntity: primaryEntityId
    }).exec();
}