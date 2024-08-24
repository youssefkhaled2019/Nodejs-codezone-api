
const { body, validationResult } = require('express-validator')
// let {courses} =require('../data/courses')
const { Courses } = require('../models/course.model')
const httpStatusText = require("../utils/httpStatusText")
const asyncWrapper = require('../middlewares/asyncWrapper')
const appError = require("../utils/appError")


const getAllCourses = asyncWrapper(async (req, res) => {

    // res.send("ddddddd")
    const query = req.query;

    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;
    let courses = await Courses.find({}, { "__v": false }).limit(limit).skip(skip); // Courses.find({price:{$gt:500}},)
    res.json({ status: httpStatusText.SUCCESS, data: { courses } })
})





const getCourses = asyncWrapper(async (req, res, next) => {


    let id = req.params.id
    let course = await Courses.findById({ "_id": id })
    if (!course) {
        const error = appError.create('course not found', 404, httpStatusText.FAIL)
        return next(error);
        // return res.status(400).json({ status: httpStatusText.FAIL, data: { course: null } })//"course  not found" 
    }
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { course } })
    //     try {
    // } catch (err) {
    //     return res.status(400).json({ status: httpStatusText.ERROR, data: null, message: "invalid object id", code: 400 })//err.message
    // }
})



const addCourse = asyncWrapper(async (req, res, next) => {

    // if (!req.body.title || !req.body.price) {
    //     return res.status(404).json({ msg: "data is empty" })
    // }


    const error_val = validationResult(req)
    // console.log(error_val)
    if (!error_val.isEmpty()) {
        // return res.status(400).json({ status: httpStatusText.FAIL, data: error_val.array() })//{errors:error_val.array()}
        const error = appError.create(error_val.array(), 400, httpStatusText.FAIL)
        return next(error);
    }
    const newcourse = new Courses(req.body)
    await newcourse.save()

    res.status(201).json({ status: httpStatusText.SUCCESS, data: { course: newcourse } })

})



const updateCourse = asyncWrapper(async (req, res, next) => {

    let id = req.params.id
    // const updatecourse = await courses.findByIdAndUpdate(id, { $set: { ...req.body } })
    const updatecourse = await Courses.updateOne({ "_id": id }, { $set: { ...req.body } })

    // if (updatecourse["upsertedId"] == null) {
    //     // return res.status(404).json({ status: httpStatusText.FAIL, data: { course: null } })
    //     const error = appError.create('course not found', 400, httpStatusText.FAIL)
    //     return next(error);
    // }

    //  courses[id]=course
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { course: updatecourse } })
    //     try {
    // } catch (err) {
    //     return res.status(400).json({ status: httpStatusText.ERROR, data: null, message: "invalid object id", code: 400 }) //err.message

    // }

})



const deleteCourse = asyncWrapper(
    async (req, res, next) => {
        let id = req.params.id
        // const deletecourse = await courses.deleteOne({ "_id": id })
        const deletecourse = await Courses.findByIdAndDelete(id)

        if (!deletecourse) {
            const error = appError.create('course not found', 400, httpStatusText.FAIL)
            return next(error);
            // return res.status(400).json({ status: httpStatusText.FAIL, data: { course: null } })//{ msg: "notfound" }
        }
        //  courses[id]=course
        res.status(200).json({ status: httpStatusText.SUCCESS, data: null })
        //     try {
        // } catch (err) {
        //     return res.status(400).json({ status: httpStatusText.ERROR, data: null, message: "invalid object id", code: 400 })

        // }

    }

)




module.exports = {
    getAllCourses,
    getCourses,
    addCourse,
    updateCourse,
    deleteCourse
}

// export{
//     getAllCourses,
//     getCourses,
//     addCourse,
//     updateCourse,
//     deleteCourse
// }