import { Controller, Delete, Get, Post, Put } from "@overnightjs/core";
import { Request, Response } from "express";
import { responseMiddleware } from "../responseMiddleware";
import { createUserGroup, updateUserGroup, deleteUserGroup, getUserGroup, getAllUserGroups } from "../services/userGroup.service";

@Controller('user-group')
export class UserGroupController {

    @Post('create')
    async createUserGroup(req: Request, res: Response){
        try {
            const user = req.headers['username'] as string
            const userGroup = {...req.body, ...{createdBy: user}}
            // console.log(userGroup)
            const data = await createUserGroup(userGroup);
            return responseMiddleware(res, true, "Entity Search Completed", false, data);
        } catch (error) {
            return responseMiddleware(res, false, error, true, error);
        }
    }

    @Post('update')
    async updateUserGroup(req: Request, res: Response){
        try {
            const data = await updateUserGroup(req.body);
            return responseMiddleware(res, true, "Entity Search Completed", false, data);
        } catch (error) {
            console.log(error)
            return responseMiddleware(res, false, "Entity Request Failed!", true, error);
        }
    }

    @Post()
    async getAllUserGroups(req: Request, res: Response){
        try {
            const data = await getAllUserGroups();
            return responseMiddleware(res, true, "Entity Search Completed", false, data);
        } catch (error) {
            console.log(error)
            return responseMiddleware(res, false, "Entity Request Failed!", true, error);
        }
    }

    @Post('get/:id')
    async getUserGroup(req: Request, res: Response){
        try {
            const data = await getUserGroup(req.params.id);
            return responseMiddleware(res, true, "Entity Search Completed", false, data);
        } catch (error) {
            return responseMiddleware(res, false, "Entity Request Failed!", true, error);
        }
    }

    @Delete('delete/:id')
    async deleteUserGroup(req: Request, res: Response){
        try {
            const data = await deleteUserGroup(req.params.id);
            return responseMiddleware(res, true, "Entity Search Completed", false, data);
        } catch (error) {
            return responseMiddleware(res, false, "Entity Request Failed!", true, error);
        }
    }
}