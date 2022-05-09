"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrimaryEntitiesByUser = void 0;
const primaryEntity_model_1 = require("models/primaryEntity.model");
function getPrimaryEntitiesByUser(user) {
    return primaryEntity_model_1.PrimaryEntity.find({
        user: user
    }).populate('entity').exec();
}
exports.getPrimaryEntitiesByUser = getPrimaryEntitiesByUser;
//# sourceMappingURL=primaryEntity.service.js.map