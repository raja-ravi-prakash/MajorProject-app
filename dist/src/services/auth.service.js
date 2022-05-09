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
exports.loginUser = exports.createUser = void 0;
const user_model_1 = require("../models/user.model");
const crypto_js_1 = require("crypto-js");
const session_model_1 = require("../models/session.model");
const config_1 = require("../../config");
const crypto_1 = require("../../crypto");
const entity_model_1 = require("../models/entity.model");
function createUser(username, password, name, email) {
    return Promise.all([
        user_model_1.User.create({
            username: username,
            password: crypto_js_1.SHA256(password).toString(crypto_js_1.enc.Base64),
            name: name,
            email: email
        }),
        entity_model_1.Entity.create({
            parent: "C15-BACKEND",
            name: "~$",
            type: entity_model_1.EntityType.FOLDER,
            user: username
        })
    ]);
}
exports.createUser = createUser;
function loginUser(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = yield user_model_1.User.find({
            username: username
        }).exec();
        if (user.length == 0)
            return {
                message: 'User Not Found',
                data: null,
                success: false
            };
        else if (user[0].password != crypto_js_1.SHA256(password).toString(crypto_js_1.enc.Base64))
            return {
                message: 'Wrong Password!',
                data: null,
                success: false
            };
        else {
            let tokenPayload = yield session_model_1.Session.find({
                username: user[0].username,
            });
            let cryptohelper = new crypto_1.CryptoHelper(config_1.default.salt, config_1.default.secretKey, config_1.default.iv);
            if (tokenPayload.length == 0)
                tokenPayload = yield session_model_1.Session.create({
                    username: user[0].username,
                    payload: cryptohelper.encrypt(JSON.stringify(user[0].toJSON()))
                });
            else
                tokenPayload = tokenPayload[0];
            let rootEntity = yield entity_model_1.Entity.findOne({
                user: username,
                name: "~$"
            }).exec();
            return {
                message: 'User Login Successfull',
                success: true,
                data: {
                    token: tokenPayload.toJSON(),
                    rootEntity: rootEntity
                }
            };
        }
    });
}
exports.loginUser = loginUser;
//# sourceMappingURL=auth.service.js.map