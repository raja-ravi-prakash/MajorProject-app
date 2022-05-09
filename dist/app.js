"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@overnightjs/core");
const express = require("express");
const device = require("express-device");
const morgan = require("morgan");
const config_1 = require("./config");
const controllers = require("./src/index");
const db_1 = require("./db");
const crypto_1 = require("./crypto");
const session_service_1 = require("./src/services/session.service");
class App extends core_1.Server {
    constructor() {
        super();
        this.escapeUrls = ['/auth/login', '/auth/register'];
        this.cryptohelper = new crypto_1.CryptoHelper(config_1.default.salt, config_1.default.secretKey, config_1.default.iv);
        this.middleware();
        this.loadControllers();
        db_1.Db.connect();
    }
    middleware() {
        this.app.enable('trust proxy');
        this.app.use(express.json({ limit: '50mb' }));
        this.app.use(morgan('dev'));
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(device.capture());
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        this.app.use(this.encryptedResponsehelper.bind(this));
        this.app.use('/modules', express.static('./modules'));
    }
    encryptedResponsehelper(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let body = req.body;
                let decryptedText = this.cryptohelper.decrypt(body.encryptedPayload);
                body.encryptedPayload = JSON.parse(decryptedText);
                req.body = Object.assign({}, body.encryptedPayload);
                if (this.escapeUrls.includes(req.path))
                    return next();
                let result = yield session_service_1.verifySession(body.sessionId);
                if (!result.success)
                    return res.send(result);
                req.headers["username"] = result.user;
                return next();
            }
            catch (error) {
                return res.send(String(error));
                return next();
            }
        });
    }
    loadControllers() {
        const controllerInstances = [];
        for (const name of Object.keys(controllers)) {
            const controller = controllers[name];
            if (typeof controller === 'function') {
                controllerInstances.push(new controller());
            }
        }
        super.addControllers(controllerInstances, null);
    }
    start() {
        this.app.listen(config_1.default.PORT, config_1.default.HOST, () => {
            console.log(`App started listening on ${config_1.default.HOST}:${config_1.default.PORT}`);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map