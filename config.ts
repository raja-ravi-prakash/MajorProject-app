require('dotenv').config();

class Config {
    private readonly HOST = process.env.HOST || 'localhost';
    private readonly PORT = process.env.PORT || 3600;

    private readonly dbhost = process.env.dbhost || 'localhost';
    private readonly dbusername = process.env.dbusername || '';
    private readonly dbpassword = process.env.dbpassword || '';
    private readonly dbname = process.env.dbname || 'c15-major-project';
    private readonly dbsource = process.env.dbsource || 'admin';
    
    private readonly secretKey = process.env.secretKey || 'default-vulnerable-key';
    private readonly iv = process.env.iv || 'default-vulnerable-iv';
    private readonly salt = process.env.salt || 'default-vulnerable-salt';
    
    public get config():any {
        return this;
    }
}

export default new Config().config;