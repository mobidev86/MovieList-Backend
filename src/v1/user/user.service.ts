import { HTTP_STATUS_CODE } from "../../common/constant";
import { CryptoService } from "../../common/crypt.service";
import { HttpError, checkValidation } from "../../common/error.handling";
import { SuccessResponse } from "../../common/response";
import { errorEmailNotFound, errorPasswordNotMatch, errorSomethingWentWrong, errorUserAlreadyExists, errorUserNotCreated, successUserLogin, successUserRegistered } from "../../common/string";
import { TypeService } from "../../common/type.service";
import { userRepository } from "../../repository/user.repository";
import { CreateUserValidator, LoginUserValidation } from "./user.validation";
import { ICreateUser, ILogin } from "./user.interface";

export class UserService {
    //#region  create user 
    async createUser(body: ICreateUser) {
        //validate user data
        await checkValidation(body, CreateUserValidator)
        //check user exists
        const checkOption = { email: body.email }
        const checkUserExist = await userRepository.findOne(checkOption)
        if (checkUserExist) throw new HttpError(errorUserAlreadyExists, HTTP_STATUS_CODE.bad_request)
        body.password = await CryptoService.hashPassword(body.password)
        //create user
        const create = await userRepository.create(body)
        if (!create) throw new HttpError(errorUserNotCreated)
        const response = { _id: create._id, user_name: create.user_name }
        return SuccessResponse(successUserRegistered, response, HTTP_STATUS_CODE.create_success)
    }
    //#endregion

    //#region login user
    async loginUser(body: ILogin) {
        await checkValidation(body, LoginUserValidation)
        const checkOption = { email: body.email }
        const attributes = ['email', 'password']
        //get user data
        const checkUserExist = await userRepository.findOne(checkOption, attributes)
        if (!checkUserExist) throw new HttpError(errorEmailNotFound, HTTP_STATUS_CODE.not_found)
        const is_password_match = CryptoService.verifyPassword(body.password, checkUserExist.password)
        if (!is_password_match) throw new HttpError(errorPasswordNotMatch, HTTP_STATUS_CODE.unauthorized)
        const tokenPayload = { email: checkUserExist.email, _id: checkUserExist._id }
        const updateUser = {
            last_login_time: TypeService.convertUTC(new Date()),
            token: await CryptoService.generateToken(tokenPayload)
        }
        const updateData = await userRepository.findOneAndUpdate({ _id: checkUserExist._id }, updateUser)
        if (!updateData) throw new HttpError(errorSomethingWentWrong)
        const data = {
            _id: updateData?._id,
            token: updateData?.token,
        }
        return SuccessResponse(successUserLogin, data, HTTP_STATUS_CODE.success)
    }
    //#endregion

}