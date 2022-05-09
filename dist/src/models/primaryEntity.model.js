"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimaryEntity = exports.PrimaryEntitySchema = void 0;
const mongoose_1 = require("mongoose");
exports.PrimaryEntitySchema = new mongoose_1.Schema({
    entity: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Entity', require: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', require: true }
});
exports.PrimaryEntity = mongoose_1.model('PrimaryEntity', exports.PrimaryEntitySchema);
//# sourceMappingURL=primaryEntity.model.js.map