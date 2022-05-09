"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGroup = exports.UserGroupSchema = exports.PERMISSIONS = void 0;
const mongoose_1 = require("mongoose");
var PERMISSIONS;
(function (PERMISSIONS) {
    PERMISSIONS["READ"] = "READ";
    PERMISSIONS["WRITE"] = "WRITE";
    PERMISSIONS["DELETE"] = "DELETE";
})(PERMISSIONS = exports.PERMISSIONS || (exports.PERMISSIONS = {}));
exports.UserGroupSchema = new mongoose_1.Schema({
    users: [{ type: mongoose_1.SchemaTypes.ObjectId, require: true, ref: 'User' }],
    permissions: [{ type: PERMISSIONS, require: true }]
});
exports.UserGroup = mongoose_1.model('UserGroup', exports.UserGroupSchema);
//# sourceMappingURL=userGroup.model.js.map