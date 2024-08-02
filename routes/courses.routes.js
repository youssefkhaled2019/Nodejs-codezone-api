const express = require('express')
const {body} = require('express-validator') //{ body, validationResult } //body is middlewares 
const course_control=require('../controllers/courses.controller')
const validationschema=require('../middlewares/validation.schema')
// import { validationschema } from '../middlewares/validation.schema.js'

const courses_router= express.Router()


courses_router.route('/')
            .get( course_control.getAllCourses )
            .post(validationschema(),course_control.addCourse)

courses_router.route('/:id')
            .get(course_control.getCourses )
            .patch(course_control.updateCourse )
            .delete( course_control.deleteCourse)



// courses_router.get("/", course_control.getAllCourses )
// courses_router.get("/:id",course_control.getCourses )
// courses_router.post("/",course_control.addCourse)
// courses_router.patch("/:id",course_control.updateCourse )
// courses_router.delete("/:id", course_control.deleteCourse)




module.exports =courses_router


// module.exports ={
//     courses_router
// }

// export {
//     coursesrouter
// }