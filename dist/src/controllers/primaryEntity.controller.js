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
exports.EntityController = void 0;
const core_1 = require("@overnightjs/core");
const responseMiddleware_1 = require("../responseMiddleware");
const primaryEntity_service_1 = require("../services/primaryEntity.service");
let EntityController = class EntityController {
    getPrimaryEntities(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield primaryEntity_service_1.getPrimaryEntitiesByUser(req.headers['username']);
                return responseMiddleware_1.responseMiddleware(res, true, "Entity Search Completed", false, data);
            }
            catch (error) {
                return responseMiddleware_1.responseMiddleware(res, false, "Entity Request Failed!", true, error);
            }
        });
    }
};
__decorate([
    core_1.Get(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EntityController.prototype, "getPrimaryEntities", null);
EntityController = __decorate([
    core_1.Controller('entity')
], EntityController);
exports.EntityController = EntityController;
//# sourceMappingURL=primaryEntity.controller.js.map