import { Entity, EntityType, IEntity } from "../models/entity.model";
import { writeFile } from 'fs';
import { PrimaryEntity } from "../models/primaryEntity.model";
import * as bash from 'shelljs';

export function getEntityBasedOnParent(parent: string, user: string){
    return Entity.find({
        parent: parent,
        user: user
    }).populate('primaryEntity').exec();
}

export function createEntityFolder(parent: string, child: string, user: string){
    return Entity.create({
        parent: parent,
        name: child,
        type: EntityType.FOLDER,
        user: user
    });
}

export async function createEntityFile(file: string, parent: string, name: string, user: string){
    let entities = await Entity.create({
        parent: parent,
        name: name,
        file: file,
        type: EntityType.FILE,
        user: user
    });

    if(!file.includes('image'))
        return true;

    let primaryEntities = await PrimaryEntity.find({
        user: user
    }).populate('entity').exec();
    
    let entityFileWriteTask = await new Promise((res, rej)=>{
        try {
            writeFile('modules/entity.json', JSON.stringify(entities), function(err){
                if(err)
                    rej(err);
                res('completed');
            });
        } catch (error) {
            rej(error);
        }
    });

    let primaryEntityFileWriteTask = await new Promise((res, rej)=>{
        try {
            writeFile('modules/primaryEntity.json', JSON.stringify(primaryEntities), function(err){
                if(err)
                    rej(err);
                res('completed');
            });
        } catch (error) {
            rej(error);
        }
    });
    return fetch("http://localhost:5000");
}

export async function deleteEntity(id: string){
    let stack: IEntity[] = [];
    let data = await Entity.findById(id).exec();
    stack.push(data);
    while(stack.length){
        let parent = stack[0]._id.toString();
        let children = await Entity.find({
            parent: parent
        }).exec();
        stack = stack.concat(children);
        await Entity.findByIdAndDelete(parent).exec();
        stack.shift();
    }
    return true;
}