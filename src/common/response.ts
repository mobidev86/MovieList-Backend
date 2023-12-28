import { HTTP_STATUS_CODE } from "./constant"

export const SuccessResponse = (message: string, data: any, statusCode: number = HTTP_STATUS_CODE.success) => {
    return {
        message: message ?? "SUCCESS",
        statusCode: statusCode ?? HTTP_STATUS_CODE.success,
        data,
    }
}