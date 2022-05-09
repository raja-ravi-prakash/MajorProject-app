"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.AuthController = void 0;
const core_1 = require("@overnightjs/core");
const auth_service_1 = require("../services/auth.service");
const responseMiddleware_1 = require("../responseMiddleware");
let AuthController = class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield auth_service_1.createUser(req.body.username, req.body.password, req.body.name, req.body.email);
                return responseMiddleware_1.responseMiddleware(res, true, "User Created Successfully", false, {});
            }
            catch (error) {
                return responseMiddleware_1.responseMiddleware(res, false, "User Creation Failed!", true, error);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield auth_service_1.loginUser(req.body.username, req.body.password);
                return responseMiddleware_1.responseMiddleware(res, data.success, data.message, false, data.data);
            }
            catch (error) {
                return responseMiddleware_1.responseMiddleware(res, false, "User Login Failed!", true, error);
            }
        });
    }
};
__decorate([
    core_1.Post('register'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    core_1.Post('login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
AuthController = __decorate([
    core_1.Controller('auth')
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controler.js.map