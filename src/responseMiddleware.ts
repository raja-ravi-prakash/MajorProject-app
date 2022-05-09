import { Response } from 'express';

interface CustomResponse {
    success: boolean,
    message: string,
    error: string,
    data: any
}

export const responseMiddleware = (res: Response, success: boolean, message: string, error: boolean, data: any) => {
    return res.send({
        success: success,
        message: message,
        error: String(error),
        data: data
    });
}