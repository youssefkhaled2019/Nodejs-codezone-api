const express = require('express')
const courses_router=require('./routes/courses.routes')




// const bodyParser = require('body-parser')
// let courses=require('./data/courses')
//-------------------------------------------
// import express from 'express'
// import {body,validationResult} from 'express-validator'
// import {coursesrouter} from './routes/courses.routes.js'
// import {courses} from './data/courses.js'
// import * as coursescontroller from '../controllers/courses.controller.js'
// import { validationschema } from '../middlewares/validation.schema.js'

const app = express()
app.use(express.json()) //bodyParser.json()
app.use('/api/courses',courses_router)









app.listen(5000, () => {
    console.log("===listening===")
})
