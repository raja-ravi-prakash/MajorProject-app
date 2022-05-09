import { Entity, EntityType, IEntity } from "../models/entity.model";
import { exec } from 'child_process';
import { writeFile } from 'fs';

export function getEntityBasedOnParent(parent: string, user: string){
    return Entity.find({
        parent: parent,
        user: user
    }).exec();
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
    let entityCreationTask = await Entity.create({
        parent: parent,
        name: name,
        file: file,
        type: EntityType.FILE,
        user: user
    });
        
    let fileWriteTask = await new Promise((res, rej)=>{
        try {
            writeFile('modules/file.json', JSON.stringify(entityCreationTask), function(err){
                if(err)
                    rej(err);
                res('completed');
            });
        } catch (error) {
            rej(error);
        }
    });

    exec("node run.js", function(error, stdout, stderr){
        console.log(error, stdout, stderr);
    });
    
    return true;
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