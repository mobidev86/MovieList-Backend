import { movieModel } from "../modals/movie.model"
import { Repository } from "./repository"

export const movieRepository = new class {
    private repository

    constructor() {
        this.repository = new Repository(movieModel)
    }
    //#region  find movie 
    async findOne(options: any, attributes: [] | string[] = []) {
        const data = await this.repository.findOne(options, attributes)
        return data
    }
    //#endregion

    //#region  create
    async create(data: any) {
        return await this.repository.create(movieModel, data)
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

    //#region  count documents
    async countDocuments(options: any = {}) {
        return await this.repository.countDocuments(options)

    }
    //#endregion

    //#region  find all document
    async findAll(options: any, attributes: [] | string[] = [], pagination = { page: 0, limit: 0 }) {
        return await this.repository.findAll(options, attributes, pagination)
    }
    //#endregion
}