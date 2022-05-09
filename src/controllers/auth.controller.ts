import { Controller, Post } from "@overnightjs/core";
import { Request, Response } from "express";
import { createUser, loginUser } from "../services/auth.service";
import { responseMiddleware } from "../responseMiddleware";

@Controller('auth')
export class AuthController {

    @Post('register')
    async register(req: Request, res: Response){
        try {
            let data = await createUser(req.body.username, req.body.password, req.body.name, req.body.email);
            return responseMiddleware(res, true, "User Created Successfully", false, {});
        } catch (error) {
            return responseMiddleware(res, false, "User Creation Failed!", true, error);
        }
    }

    @Post('login')
    async login(req: Request, res: Response){
        try {
            let data: any = await loginUser(req.body.username, req.body.password);
            return responseMiddleware(res, data.success, data.message, false, data.data);
        } catch (error) {
            return responseMiddleware(res, false, "User Login Failed!", true, error);
        }
    }
}