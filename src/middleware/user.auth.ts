import { Request, Response, NextFunction } from "express";
import { HttpError } from "../common/error.handling";
import { errorPleaseProvideAccessToken } from "../common/string";
import { CryptoService } from "../common/crypt.service";
import { userRepository } from "../repository/user.repository";
import { HTTP_STATUS_CODE } from "../common/constant";
import { Types } from "mongoose";

//#region user authentication
export async function userAuth(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    const headers = req.headers;
    const token = headers?.authorization?.split("Bearer")[1]?.trim();
    if (!token)
        throw new HttpError(
            errorPleaseProvideAccessToken,
            HTTP_STATUS_CODE.unauthorized,
        );
    const is_verified: any = await CryptoService.verifyJWTToken(token);
    if (!is_verified || !is_verified?._id)
        throw new HttpError(
            errorPleaseProvideAccessToken,
            HTTP_STATUS_CODE.unauthorized,
        );
    let _id = is_verified?._id;
    const checkUser = await userRepository.findOne({ _id, token });
    if (!checkUser)
        throw new HttpError(
            errorPleaseProvideAccessToken,
            HTTP_STATUS_CODE.unauthorized,
        );
    _id = new Types.ObjectId(_id)
    req.body.userId = _id;
    req.query.userId = _id;
    next();
}
