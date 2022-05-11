import { Controller, Get, Post } from "@overnightjs/core";
import { Request, Response } from "express";
import { responseMiddleware } from "../responseMiddleware";
import { getPrimaryEntitiesByUser, getEntitiesByPrimaryEntity } from "../services/primaryEntity.service";

@Controller('primary-entity')
export class PrimaryEntityController {

    @Post('')
    async getPrimaryEntities(req: Request, res: Response){
        try {
            let data = await getPrimaryEntitiesByUser(req.headers['username'] as string);
            return responseMiddleware(res, true, "Primary Entity Search Completed", false, data);
        } catch (error) {
            return responseMiddleware(res, false, "Primary Entity Request Failed!", true, error);
        }
    }

    @Post('entity')
    async getEntitiesMapped(req: Request, res: Response){
        try{
            let data = await getEntitiesByPrimaryEntity(req.headers['username'] as string, req.body.primaryEntity);
            return responseMiddleware(res, true, "Primary Entity Search Completed", false, data);
        } catch(error){
            return responseMiddleware(res, false, "Primary Entity Search Failed!", true, error);
        }
    }
}