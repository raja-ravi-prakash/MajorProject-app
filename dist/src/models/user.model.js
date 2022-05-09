"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    username: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    name: { type: String, require: true },
    email: { type: String, unique: true, require: true },
});
exports.User = mongoose_1.model('User', exports.UserSchema);
//# sourceMappingURL=user.model.js.map