import { ACTIVE, DE_ACTIVE, HTTP_STATUS_CODE, PAGE, PAGE_LIMIT } from "../../common/constant";
import { HttpError, checkValidation } from "../../common/error.handling";
import { SuccessResponse } from "../../common/response";
import { SUCCESS, errorMovieAlreadyExists, errorMovieNotAdded, errorPublishYearNotValid, successMovieAdded } from "../../common/string";
import { movieRepository } from "../../repository/movie.repository";
import { IAddMovie, IEditMovie, IGetMovie } from "./movie.interface";
import { AddMovieValidation, EditMovieValidation } from "./movie.validation";


export class MovieService {

    //#region  add movie 
    async addMovie(body: IAddMovie) {
        await checkValidation(body, AddMovieValidation)
        const checkOption = { title: body.title }
        //check movie already exist or not
        const checkMovie = await movieRepository.findOne(checkOption)
        if (checkMovie) throw new HttpError(errorMovieAlreadyExists, HTTP_STATUS_CODE.bad_request)
        const currentYear = new Date().getFullYear()
        if (currentYear < body.publish_year)
            throw new HttpError(errorPublishYearNotValid, HTTP_STATUS_CODE.bad_request)
        const addMovie = await movieRepository.create(body)
        if (!addMovie) throw new HttpError(errorMovieNotAdded)
        return SuccessResponse(successMovieAdded, addMovie, HTTP_STATUS_CODE.create_success)
    }
    //#endregion

    //#region  get movie list
    async getMovieList(body: IGetMovie) {
        const page = +(body?.page ?? PAGE)
        const query = { active: ACTIVE }
        const count = await movieRepository.countDocuments(query)
        const attributes = ['title', 'poster_image', 'publish_year']
        const pagination = { page, limit: PAGE_LIMIT }
        const data = await movieRepository.findAll(query, attributes, pagination)
        const responseData = { count, data }
        return SuccessResponse(SUCCESS, responseData, HTTP_STATUS_CODE.success)
    }
    //#endregion

    //#region  edit movie 
    async editMovie(body: IEditMovie) {
        await checkValidation(body, EditMovieValidation)

        const updateMovie: any = {}
        if (body.title) {
            // const checkOption = { title: body.title }
            // //check movie already exist or not
            // const checkMovie = await movieRepository.findOne(checkOption)
            // if (checkMovie) throw new HttpError(errorMovieAlreadyExists, HTTP_STATUS_CODE.bad_request)
            updateMovie.title = body.title
        }
        if (body.publish_year) {
            const currentYear = new Date().getFullYear()
            if (currentYear < body.publish_year)
                throw new HttpError(errorPublishYearNotValid, HTTP_STATUS_CODE.bad_request)
            updateMovie.publish_year = body.publish_year
        }
        if (body.poster_image)
            updateMovie.poster_image = body.poster_image
        const filter = { _id: body._id }
        const active: any = +(body?.active ?? -1)
        if ([ACTIVE, DE_ACTIVE].includes(active)) updateMovie.active = active
        //update movie details
        const update = await movieRepository.update(filter, updateMovie)
        return SuccessResponse(SUCCESS, null, HTTP_STATUS_CODE.success)

    }
    //#endregion
}