
const { body, validationResult } = require('express-validator')
// let {courses} =require('../data/courses')
const { User } = require('../models/user.model')
const httpStatusText = require("../utils/httpStatusText")
const asyncWrapper = require('../middlewares/asyncWrapper')
const appError = require("../utils/appError")
const hash = require("bcryptjs")
const generateJWT=require('../utils/generateJWT')
const getAllUsers = asyncWrapper(async (req, res) => {

    // res.send("ddddddd")
    // console.log(req.headers)
    const query = req.query;
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;
    let users = await User.find({}, { "__v": false ,"password": false,"token":false }).limit(limit).skip(skip); // Courses.find({price:{$gt:500}},)
    res.json({ status: httpStatusText.SUCCESS, data: { users } })
})




const register = asyncWrapper(async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body
    const olduser = await User.findOne({ email: email })
    if (olduser) {
        const error = appError.create('email already exists', 400, httpStatusText.FAIL)
        return next(error);
    }

    const hashedpassword= await hash.hash(password, 10)

    const newUser = new User({ firstName, lastName, email,password: hashedpassword })

    // jwt
    // const token = await jwt.sign({ email:newUser.email ,id:newUser.id }, process.env.JWT_SECRT_KEY,{expiresIn:'1m'});//10m,10s,10d
    newUser.token=await generateJWT({ email:newUser.email ,id:newUser._id })


    await newUser.save()

    res.status(201).json({ status: httpStatusText.SUCCESS, data: { user: newUser } })

    // let course = await Courses.findById({ "_id": id })
    // if (!course) {
    //     const error = appError.create('course not found', 404, httpStatusText.FAIL)
    //     return next(error);
    //     // return res.status(400).json({ status: httpStatusText.FAIL, data: { course: null } })//"course  not found" 
    // }
    // res.status(200).json({ status: httpStatusText.SUCCESS, data: { course } })
    //     try {
    // } catch (err) {
    //     
    // }
})



const login = asyncWrapper(async (req, res, next) => {

    // if (!req.body.title || !req.body.price) {
    //     return res.status(404).json({ msg: "data is empty" })
    // }
    const {email, password } = req.body
  if (!email && !password) {
        const error = appError.create('email and password are required', 400, httpStatusText.FAIL)
        return next(error);
    }

    const user = await User.findOne({ email: email})

    
    if (!user) {
        const error = appError.create('user not found', 400, httpStatusText.FAIL)
        return next(error);
    }

    const matchpassword= await hash.compare(password,user.password)



    if (user && matchpassword ){
        const token= await generateJWT({ email:user.email ,id:user.id })
        return res.status(201).json({ status: httpStatusText.SUCCESS, data: { token:token  } })//user.token

    }else{
        const error = appError.create("something wrong", 400, httpStatusText.ERROR)
        return next(error);
    }

    // const error_val = validationResult(req)
    // // console.log(error_val)
    // if (!error_val.isEmpty()) {
    //     // return res.status(400).json({ status: httpStatusText.FAIL, data: error_val.array() })//{errors:error_val.array()}
    //     const error = appError.create(error_val.array(), 400, httpStatusText.FAIL)
    //     return next(error);
    // }
    // const newcourse = new Courses(req.body)
    // await newcourse.save()

    // res.status(201).json({ status: httpStatusText.SUCCESS, data: { course: newcourse } })

})






module.exports = {
    getAllUsers,
    register,
    login
}

// export{
//     getAllCourses,
//     getCourses,
//     addCourse,
//     updateCourse,
//     deleteCourse
// }