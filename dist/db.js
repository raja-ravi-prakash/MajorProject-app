"use strict";
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
exports.Db = void 0;
const mongoose = require("mongoose");
const config_1 = require("./config");
class Db {
    static connect() {
        let dbUrl = 'mongodb://' + config_1.default.dbhost + '/' + config_1.default.dbname, opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoReconnect: true,
            reconnectInterval: 5000,
            reconnectTries: Number.MAX_VALUE,
            autoCreate: true
        };
        if (config_1.default.dbusername && config_1.default.dbpassword && config_1.default.dbsource) {
            dbUrl = 'mongodb://' + config_1.default.dbusername + ':' +
                config_1.default.dbpassword + '@' + config_1.default.dbhost +
                '/' + config_1.default.dbname + '?authSource=' + config_1.default.dbsource;
        }
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            try {
                mongoose.connection.on('connected', () => { console.info('Db connected'); });
                mongoose.connection.on('close', () => { console.error('lost Db connection'); });
                mongoose.connection.on('reconnected', () => { console.info('Db reconnected'); });
                mongoose.connection.on('error', () => { console.error('Db connection error'); });
                yield mongoose.connect(dbUrl, opts);
                resolve();
            }
            catch (err) {
                console.debug('Error while db connection ' + JSON.stringify(err));
            }
        }));
    }
}
exports.Db = Db;
//# sourceMappingURL=db.js.map