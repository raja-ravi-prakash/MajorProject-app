import { Entity, EntityType, IEntity } from "../models/entity.model";
import { exec, spawn } from 'child_process';
import { writeFile } from 'fs';
import { PrimaryEntity } from "../models/primaryEntity.model";
import * as mongoose from "mongoose";

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

export const  getMyFiles = async (user:any) =>
{
    const entities = await Entity.aggregate(
        [
            {
              '$unwind': {
                'path': '$userGroups'
              }
            }, {
              '$lookup': {
                'from': 'usergroups', 
                'localField': 'userGroups', 
                'foreignField': '_id', 
                'as': 'userGroups'
              }
            }, {
              '$unwind': {
                'path': '$userGroups'
              }
            }, {
              '$group': {
                '_id': '$_id', 
                'users': {
                  '$push': '$userGroups.users'
                }
              }
            }, {
              '$addFields': {
                'users': {
                  '$reduce': {
                    'input': '$users', 
                    'initialValue': [], 
                    'in': {
                      '$concatArrays': [
                        '$$value', '$$this'
                      ]
                    }
                  }
                }
              }
            }, {
              '$lookup': {
                'from': 'entities', 
                'localField': '_id', 
                'foreignField': '_id', 
                'as': 'entity'
              }
            }, {
              '$unwind': {
                'path': '$entity'
              }
            }, {
              '$addFields': {
                'entity.sharedUsers': '$users'
              }
            }, {
              '$replaceRoot': {
                'newRoot': '$entity'
              }
            }, {
              '$match': {
                'sharedUsers': user
              }
            }
          ]
    );
    return entities;
}
export async function createEntityFile(file: string, parent: string,userGroups:string[], name: string, user: string){
    const userGroupIds = userGroups.map(userGroup => mongoose.Types.ObjectId(userGroup));
    let entities = await Entity.create({
        parent: parent,
        name: name,
        file: file,
        type: EntityType.FILE,
        user: user,
        userGroups: userGroupIds
    });

    return ;

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

    let childProcess = spawn(process.cwd() + "/primaryEntity.sh");
    childProcess.on('error', function(error){
        console.log('error', error);
    });
    childProcess.on('close', function(code, signal){
        console.log('close', code, signal);
    });
    childProcess.on('disconnect', function(){
        console.log("disconnected");
    });
    childProcess.on('exit', function(code, signal){
        console.log('exit', code, signal);
    });
    childProcess.on('message', function(message){
        console.log(message);
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