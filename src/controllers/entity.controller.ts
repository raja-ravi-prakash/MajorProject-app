import { Controller, Delete, Get, Post, Put } from "@overnightjs/core";
import { Request, Response } from "express";
import { responseMiddleware } from "../responseMiddleware";
import { getEntityBasedOnParent, createEntityFolder, createEntityFile, deleteEntity } from "../services/entity.service";

@Controller('entity')
export class EntityController {

    @Post('')
    async getEntities(req: Request, res: Response){
        try {
            let data = await getEntityBasedOnParent(req.body.parent, req.headers['username'] as string);
            return responseMiddleware(res, true, "Entity Search Completed", false, data);
        } catch (error) {
            return responseMiddleware(res, false, "Entity Request Failed!", true, error);
        }
    }

    @Post('folder')
    async createEntity(req: Request, res: Response){
        try {
            let data = await createEntityFolder(req.body.parent, req.body.child, req.headers['username'] as string);
            return responseMiddleware(res, true, "Entity Folder Created Successfully", false, data);
        } catch (error) {
            return responseMiddleware(res, false, "Entity Request Failed!", true, error);
        }
    }

    @Post('file')
    async createFile(req: Request, res: Response){
        try {
            let data = await createEntityFile(req.body.file, req.body.parent, req.body.name, req.headers['username'] as string);
            return responseMiddleware(res, true, "Entity File Created Successfully", false, data);
        } catch (error) {
            return responseMiddleware(res, false, "Entity Request Failed!", true, error);
        }
    }

    @Delete('')
    async deleteEntity(req: Request, res: Response){
        try {
            let data = await deleteEntity(req.query.id as string);
            return responseMiddleware(res, true, "Entity Deleted Successfully", false, data);
        } catch (error) {
            return responseMiddleware(res, false, "Entity Request Failed!", true, error);
        }
    }

}