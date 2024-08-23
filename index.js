const express = require('express')
const cors = require('cors')
const courses_router=require('./routes/courses.routes')
const user_router=require('./routes/user.routes')

const mongoose = require('mongoose');
const httpStatusText=require('./utils/httpStatusText')
require('dotenv').config()

const url = process.env.URL_DARABASE;

mongoose.connect(url).then(() => console.log('connect'));



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
app.use(cors())
app.use(express.json()) //bodyParser.json()
app.use('/api/courses',courses_router)
app.use('/api/users',user_router)
app.all('*',(req,res,next)=>{
    return res.status(404).json({ status: httpStatusText.ERROR, data: null, message: "invalid URL ", code: 400 })//err.message

res.send("NotFound")
})


// global error handler
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({status: error.statusText || httpStatusText.ERROR, message: error.message, code: error.statusCode || 500, data: null});
})





app.listen(process.env.PORT || 4000, () => {
    console.log("===listening===")
})
