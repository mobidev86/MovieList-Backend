import express, { Application } from "express";
import { userRouting } from "./v1/user/user.controller";
import { movieRouting } from "./v1/movie/movie.controller";
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from "./docs/swagger.json";
import { userAuth } from "./middleware/user.auth";
import { asyncHandler } from "./common/error.handling";
import path from 'path'
import cors from 'cors'
export const createApplication = (app: Application) => {
    //app middleware
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cors())
    app.use('/upload', express.static(path.join(__dirname, '..', 'upload')));
    app.use('/api/user/', userRouting)
    app.use('/api/movie/', [asyncHandler(userAuth)], movieRouting)
    const base_url: any = process.env.SERVER_URL
    swaggerOutput.host = base_url
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));




}