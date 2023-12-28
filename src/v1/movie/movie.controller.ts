import express, { Request, Response } from 'express'
const route = express.Router()
import { asyncHandler } from '../../common/error.handling'
import { MovieService } from './movie.service'
import { upload } from '../../common/type.service'

const movieService = new MovieService()

//#region  add new movie
route.post('/addMovie', [upload.single("poster_image")], asyncHandler(async (req: Request, res: Response) => {
    const response = await movieService.addMovie(req.body)
    return res.status(response.statusCode).json(response)
}))
//#endregion

//#region  movie list
route.get('/movies', asyncHandler(async (req: Request, res: Response) => {
    const response = await movieService.getMovieList(req.query)
    return res.status(response.statusCode).json(response)
}))

//#region  edit movie
route.post('/editMovie', [upload.single("poster_image")], asyncHandler(async (req: Request, res: Response) => {
    const response = await movieService.editMovie(req.body)
    return res.status(response.statusCode).json(response)
}))
//#endregion
export const movieRouting = route