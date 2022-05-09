import { enc, AES } from 'crypto-js';

export class CryptoHelper {
    private salt: string;
    private secretKey: string;
    private iv: string;

    constructor(salt: string, secretKey: string, iv: string){
        this.salt = salt;
        this.secretKey = secretKey;
        this.iv = iv;
    }

    public encrypt(value: string){
        let b64 = AES.encrypt(value, this.secretKey, {
            iv: this.iv as any
        }).toString();
        let e64 = enc.Base64.parse(b64);
        let ehex = e64.toString(enc.Hex);
        return ehex;
    }
    
    public decrypt(value: string){
        let e64 = enc.Hex.parse(value);
        let bytes = e64.toString(enc.Base64);
        let decrypt = AES.decrypt(bytes, this.secretKey, {
            iv: this.iv as any
        });
        let plain = decrypt.toString(enc.Utf8);
        return plain;
    }
}