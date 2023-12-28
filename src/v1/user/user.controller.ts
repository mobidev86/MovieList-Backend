import express, { Request, Response } from 'express'
const route = express.Router()
import { UserService } from './user.service'
import { asyncHandler } from '../../common/error.handling'

const userService = new UserService()
//#region  create user
route.post('/createUser', asyncHandler(async (req: Request, res: Response) => {
    const body = req.body
    const response = await userService.createUser(body)
    return res.status(response.statusCode).json(response)
}))
//#endregion

//#region  login user
route.post('/login', asyncHandler(async (req: Request, res: Response) => {
    const body = req.body
    const response = await userService.loginUser(body)
    return res.status(response.statusCode).json(response)
}))

export const userRouting = route