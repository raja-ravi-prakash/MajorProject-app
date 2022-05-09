import { Server } from '@overnightjs/core';
import { Request, Response } from "express";
import * as express from 'express';
import * as device from 'express-device';
import * as morgan from 'morgan'

import config from './config';
import * as controllers from './src/index';

import { Db } from './db';

import { CryptoHelper } from './crypto';
import { verifySession } from './src/services/session.service';

interface InterceptedRequestBody {
    sessionId: string,
    encryptedPayload: string | Object
}

class App extends Server{

    private cryptohelper: CryptoHelper;
    private escapeUrls = ['/auth/login', '/auth/register']
    constructor(){
        super();
        this.cryptohelper = new CryptoHelper(config.salt, config.secretKey, config.iv);
        this.middleware();
        this.loadControllers();
        Db.connect();
    }

    private middleware(){
        this.app.enable('trust proxy');
        this.app.use(express.json({limit: '50mb'}))
        this.app.use(morgan('dev'));
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(device.capture());
        this.app.use(function(req, res, next){
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        this.app.use(this.encryptedResponsehelper.bind(this));
        this.app.use('/modules', express.static('./modules'));
    }

    private async encryptedResponsehelper(req: Request, res: Response, next){
        try {
            let body: InterceptedRequestBody = req.body;
            let decryptedText = this.cryptohelper.decrypt(body.encryptedPayload as string);
            body.encryptedPayload = JSON.parse(decryptedText as string) as Object;
            req.body = {...body.encryptedPayload};
            if(this.escapeUrls.includes(req.path))
                return next();
            let result = await verifySession(body.sessionId);
            if(!result.success)
                return res.send(result);
            req.headers["username"] = result.user;
            return next();
        } catch (error) {
            return res.send(String(error));
            return next();
        }
    }

    private loadControllers(){
        const controllerInstances = [];
        for (const name of Object.keys(controllers)) {
            const controller = (controllers as any)[name];
            if (typeof controller === 'function') {
                controllerInstances.push(new controller());
            }
        }
        super.addControllers(controllerInstances, null);
    }

    public start(){
        this.app.listen(config.PORT, config.HOST, ()=>{
            console.log(`App started listening on ${config.HOST}:${config.PORT}`);
        });
    }
}

export default App;