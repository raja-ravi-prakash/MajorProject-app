import * as mongodb from 'mongodb';
import * as mongoose from 'mongoose';
import { ConnectOptions } from 'mongoose';
import config from './config';

export class Db {

    public static connect() {
        let dbUrl = 'mongodb://' + config.dbhost + '/' + config.dbname,
            opts: ConnectOptions = {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                autoReconnect: true,
                reconnectInterval: 5000,
                reconnectTries: Number.MAX_VALUE,
                autoCreate: true
            };
        if (config.dbusername && config.dbpassword && config.dbsource) {
            dbUrl = 'mongodb://' + config.dbusername + ':' +
                config.dbpassword + '@' + config.dbhost +
                '/' + config.dbname + '?authSource=' + config.dbsource
        }

        return new Promise<void>(async (resolve) => {
            try {
                mongoose.connection.on('connected', () => { console.info('Db connected'); });
                mongoose.connection.on('close', () => { console.error('lost Db connection'); });
                mongoose.connection.on('reconnected', () => { console.info('Db reconnected'); });
                mongoose.connection.on('error', () => { console.error('Db connection error'); });
                await mongoose.connect(dbUrl, opts);
                resolve();
            } catch (err) {
                console.debug('Error while db connection ' + JSON.stringify(err));
            }

        });
    }
}