"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseMiddleware = void 0;
exports.responseMiddleware = (res, success, message, error, data) => {
    return res.send({
        success: success,
        message: message,
        error: String(error),
        data: data
    });
};
//# sourceMappingURL=responseMiddleware.js.map