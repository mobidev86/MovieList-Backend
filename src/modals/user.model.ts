import { Document, Schema, model } from "mongoose";
import { ModelName } from "../common/models";
import { CryptoService } from "../common/crypt.service";
import { ACTIVE } from "../common/constant";
// Define the interface for your document
interface IUser extends Document {
    user_name: string;
    email: string;
    password: string,
    token: string,
    last_login_time: Date
    active: number
}

//create user schema
const userSchema = new Schema({
    user_name: { type: String, required: true },
    email: {
        type: String,
        set: CryptoService.encryptText,
        get: CryptoService.decryptText,
        required: true
    },
    password: { type: String, required: true },
    token: { type: String, required: false },
    last_login_time: { type: Date },
    active: { type: Number, default: ACTIVE }

}, {
    timestamps: true,
});

//create model
export const userModel = model<IUser>(ModelName.user, userSchema)