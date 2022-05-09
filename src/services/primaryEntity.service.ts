import { PrimaryEntity } from "models/primaryEntity.model";

export function getPrimaryEntitiesByUser(user: string){
    return PrimaryEntity.find({
        user: user
    }).populate('entity').exec();
}