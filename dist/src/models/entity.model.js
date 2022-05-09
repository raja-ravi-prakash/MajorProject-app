"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = exports.EntityType = void 0;
const mongoose_1 = require("mongoose");
var EntityType;
(function (EntityType) {
    EntityType["FILE"] = "FILE";
    EntityType["FOLDER"] = "FOLDER";
})(EntityType = exports.EntityType || (exports.EntityType = {}));
const EntitySchema = new mongoose_1.Schema({
    type: { type: EntityType, require: true },
    name: { type: String, require: true },
    parent: { type: mongoose_1.Schema.Types.ObjectId, require: true, ref: 'Entity' },
    file: { type: String, require: true },
    user: { type: String, require: true }
});
exports.Entity = mongoose_1.model('Entity', EntitySchema);
//# sourceMappingURL=entity.model.js.map