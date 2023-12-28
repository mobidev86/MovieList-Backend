import { Types } from "mongoose"

export interface IAddMovie {
    title: string,
    publish_year: number,
    poster_image: string
}

export interface IGetMovie {
    search_text?: string,
    page?: number,
}

export interface IEditMovie {
    _id: Types.ObjectId,
    title?: string,
    publish_year?: number,
    poster_image?: string
    active?: number | undefined
}
