"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
class Config {
    constructor() {
        this.HOST = process.env.HOST || 'localhost';
        this.PORT = process.env.PORT || 3600;
        this.dbhost = process.env.dbhost || 'localhost';
        this.dbusername = process.env.dbusername || '';
        this.dbpassword = process.env.dbpassword || '';
        this.dbname = process.env.dbname || 'c15-major-project';
        this.dbsource = process.env.dbsource || 'admin';
        this.secretKey = process.env.secretKey || 'default-vulnerable-key';
        this.iv = process.env.iv || 'default-vulnerable-iv';
        this.salt = process.env.salt || 'default-vulnerable-salt';
    }
    get config() {
        return this;
    }
}
exports.default = new Config().config;
//# sourceMappingURL=config.js.map