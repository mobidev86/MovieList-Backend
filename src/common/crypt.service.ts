
import crypto from "crypto";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { HttpError } from "./error.handling";
import { errorTokenNotCreate } from "./string";
const algorithm = "aes-256-cbc";
const randomKey = process.env.ENCRYPT_KEY ?? "";
const randomIv = process.env.ENCRYPT_IV ?? "";
const tokenSecret: string = process.env.JWT_SECRET ?? "";
export class CryptoService {
    //#region create json web token
    static async generateToken(
        options: any,
        expireTime: string | null = null,
    ) {
        const otherOptions: jwt.SignOptions = {};
        if (expireTime) otherOptions.expiresIn = expireTime;
        const tokenDetails = await jwt.sign(options, tokenSecret, otherOptions);
        if (!tokenDetails) throw new HttpError(errorTokenNotCreate);
        return tokenDetails;
    }
    //#endregion

    //#region  verify token
    static async verifyJWTToken(token: string) {
        try { return await jwt.verify(token, tokenSecret); } catch (e) { return false }
    }

    //#region hash password
    static async hashPassword(password: string) {
        const saltRound = 10;
        return await bcryptjs.hashSync(password, saltRound);
    }
    //#endregion

    //#region  verify password
    static async verifyPassword(text: string, hash: string) {
        return await bcryptjs.compareSync(text, hash);
    }
    //#endregion

    //#region encrypt text
    static encryptText(text: string) {
        if (!text) {
            return "";
        }
        const cipher = crypto.createCipheriv(algorithm, randomKey, randomIv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return encrypted.toString("hex");
    }
    //#endregion

    //#region  decrypt text
    static decryptText(encryptText: string) {
        if (!encryptText) return "";
        const encryptedText = Buffer.from(encryptText, "hex");
        const decipher = crypto.createDecipheriv(algorithm, randomKey, randomIv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
    //#endregion
}
