import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS_CODE } from "./constant";
import { validate } from "class-validator";

export class HttpError extends Error {
    statusCode: number;
    constructor(
        message: string | undefined,
        statusCode = HTTP_STATUS_CODE.internal_error,
    ) {
        super(message);
        this.statusCode = statusCode ?? HTTP_STATUS_CODE.internal_error;
        this.name = this.constructor.name;
    }
}
//#region  async handler
export const asyncHandler =
    (fn: any) => (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((errorObj) => {
            if (errorObj instanceof HttpError) {
                return res
                    .status(errorObj.statusCode)
                    .json({ error: errorObj.message });
            } else {
                console.log({ errorObj })
                const message = errorObj?.error ?? "Internal Server Error"
                // Handle other types of errors
                return res
                    .status(HTTP_STATUS_CODE.internal_error)
                    .json({ error: message });
            }
        });
    };
//#endregion


//#region validation payloads
export const checkValidation = async (userInput: any, Validation: any) => {
    const validation = new Validation()
    Object.assign(validation, userInput);
    //check validation payloads
    const validateUser = await validate(validation);
    const isErrorFound: any = validateUser.find((val) => true);
    const messageObj = isErrorFound?.constraints ?? {};

    for (const key in messageObj) {
        throw new HttpError(messageObj[key], HTTP_STATUS_CODE.bad_request);
    }
    userInput = validation
};
//#endregion

