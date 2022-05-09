import { Controller, Get, Post } from "@overnightjs/core";
import { Request, Response } from "express";
import { responseMiddleware } from "../responseMiddleware";
import { getPrimaryEntitiesByUser } from "../services/primaryEntity.service";

@Controller('primary-entity')
export class PrimaryEntityController {

    @Get('')
    async getPrimaryEntities(req: Request, res: Response){
        try {
            let data = await getPrimaryEntitiesByUser(req.headers['username'] as string);
            return responseMiddleware(res, true, "Entity Search Completed", false, data);
        } catch (error) {
            return responseMiddleware(res, false, "Entity Request Failed!", true, error);
        }
    }

}