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
exports.verifySession = void 0;
const session_model_1 = require("../models/session.model");
const user_model_1 = require("../models/user.model");
function verifySession(sessionId) {
    return __awaiter(this, void 0, void 0, function* () {
        let session = yield session_model_1.Session.find({
            payload: sessionId
        }).exec();
        if (session.length == 0)
            return {
                message: 'No Session Found!',
                success: false,
                data: null
            };
        else {
            let username = session[0].username;
            let user = yield user_model_1.User.find({
                username: username
            }).exec();
            if (user.length == 0)
                return {
                    message: 'User Not Found',
                    data: null,
                    success: false
                };
            return {
                message: "Session Found",
                data: null,
                success: true,
                user: session[0].username
            };
        }
    });
}
exports.verifySession = verifySession;
//# sourceMappingURL=session.service.js.map