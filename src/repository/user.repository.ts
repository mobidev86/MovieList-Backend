import { userModel } from "../modals/user.model"
import { Repository } from "./repository"

export const userRepository = new class {
    private repository

    constructor() {
        this.repository = new Repository(userModel)
    }
    //#region  find user 
    async findOne(options: any, attributes: [] | string[] = []) {
        const data = await this.repository.findOne(options, attributes)
        return data
    }
    //#endregion

    //#region  create
    async create(data: any) {
        return await this.repository.create(userModel, data)
    }
    //#endregion

    //#region  update 
    async update(options: any, updateData: any,) {
        return await this.repository.update(options, updateData)
    }
    //#endregion

    //#region  update and find document
    async findOneAndUpdate(options: any, updateData: any) {
        return await this.repository.findOneAndUpdate(options, updateData)
    }
    //#endregion
}