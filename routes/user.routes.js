const express = require('express')
const {body} = require('express-validator') //{ body, validationResult } //body is middlewares 
const user_control=require('../controllers/user.controller')
// const validationschema=require('../middlewares/validation.schema')
// import { validationschema } from '../middlewares/validation.schema.js'
const verifyToken=require('../middlewares/verfiyToken')
const appError = require('../utils/appError');
const multer  = require('multer')



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file)
    cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const fileName = `user-${Date.now()}.${ext}`;
        cb(null, fileName);
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const fileFilter = (req, file, cb) => {
    const imageType = file.mimetype.split('/')[0];
    
    if(imageType === 'image') {
        return cb(null, true)
    } else {
        return cb(appError.create('file must be an image', 400), false)
    }
}


const upload = multer({ storage: storage ,fileFilter})


const user_router= express.Router()


user_router.route('/')
            .get(verifyToken, user_control.getAllUsers )

user_router.route('/register')
            .post(upload.single('avatar'),user_control.register)

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