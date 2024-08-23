const express = require('express')
const {body} = require('express-validator') //{ body, validationResult } //body is middlewares 
const user_control=require('../controllers/user.controller')
// const validationschema=require('../middlewares/validation.schema')
// import { validationschema } from '../middlewares/validation.schema.js'
const verifyToken=require('../middlewares/verfiyToken')
const user_router= express.Router()


user_router.route('/')
            .get(verifyToken, user_control.getAllUsers )

user_router.route('/register')
            .post(user_control.register)

user_router.route('/login')
            .post(user_control.login)


// courses_router.get("/", course_control.getAllCourses )
// courses_router.get("/:id",course_control.getCourses )
// courses_router.post("/",course_control.addCourse)
// courses_router.patch("/:id",course_control.updateCourse )
// courses_router.delete("/:id", course_control.deleteCourse)




module.exports =user_router


// module.exports ={
//     courses_router
// }

// export {
//     coursesrouter
// }