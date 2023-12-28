import express, { Application } from 'express'
//database connection
// config file for global variable
import dotenv from 'dotenv'
dotenv.config()
import { createApplication } from './routing'
import './database/db.connection'
// node application 
const app: Application = express()
createApplication(app)
// server
const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server listing to ${port}`)
})