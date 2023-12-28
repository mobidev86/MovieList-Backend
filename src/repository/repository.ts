

export class Repository {
    collection: any
    constructor(model: any) {
        this.collection = model
    }

    //#region  find one
    async findOne(options: any, attributes: string[] | [] = []) {
        return await this.collection.findOne(options).select(['_id', ...attributes])
    }
    //#endregion

    //#region  create
    async create(collection: any, data: any) {
        return await new collection(data).save()
    }
    //#endregion

    //#region update
    async update(options: any, updateData: any) {
        return await this.collection.updateOne(options, updateData)
    }
    //#endregion

    //#region find and update
    async findOneAndUpdate(options: any, updateData: any) {
        return await this.collection.findOneAndUpdate(options, updateData, { returnDocument: "after" })
    }
    //#endregion

    //#region  count documents
    async countDocuments(options: any) {
        return await this.collection.countDocuments(options)
    }
    //#endregion

    // #region  count documents
    async findAll(options: any, attributes: string[] | [] = [], pagination = { page: 0, limit: 0 }) {
        if (pagination.page > 0)
            pagination.page = +(pagination.page * pagination.limit) - pagination.limit
        return await this.collection.find(options)
            .skip(pagination.page)
            .limit(pagination.limit)
            .select(['_id', ...attributes])
    }
    //#endregion

}