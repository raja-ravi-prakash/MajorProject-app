"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = exports.SessionSchema = void 0;
const mongoose_1 = require("mongoose");
const moment = require("moment");
exports.SessionSchema = new mongoose_1.Schema({
    username: { type: String, unique: true, require: true },
    payload: { type: String, unique: true, require: true },
    expiry: { type: Date, default: moment().add(6, 'hours') }
});
exports.Session = mongoose_1.model('Session', exports.SessionSchema);
//# sourceMappingURL=session.model.js.map