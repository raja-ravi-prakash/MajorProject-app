"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoHelper = void 0;
const crypto_js_1 = require("crypto-js");
class CryptoHelper {
    constructor(salt, secretKey, iv) {
        this.salt = salt;
        this.secretKey = secretKey;
        this.iv = iv;
    }
    encrypt(value) {
        let b64 = crypto_js_1.AES.encrypt(value, this.secretKey, {
            iv: this.iv
        }).toString();
        let e64 = crypto_js_1.enc.Base64.parse(b64);
        let ehex = e64.toString(crypto_js_1.enc.Hex);
        return ehex;
    }
    decrypt(value) {
        let e64 = crypto_js_1.enc.Hex.parse(value);
        let bytes = e64.toString(crypto_js_1.enc.Base64);
        let decrypt = crypto_js_1.AES.decrypt(bytes, this.secretKey, {
            iv: this.iv
        });
        let plain = decrypt.toString(crypto_js_1.enc.Utf8);
        return plain;
    }
}
exports.CryptoHelper = CryptoHelper;
//# sourceMappingURL=crypto.js.map