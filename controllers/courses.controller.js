
const { body, validationResult } = require('express-validator')
// let {courses} =require('../data/courses')
const { courses } = require('../models/course.model')

const getAllCourses = async (req, res) => {

    // res.send("ddddddd")
    let data = await courses.find()
    res.json(data)
}


const getCourses = async (req, res) => {

    try {
        let id = req.params.id
        let course = await courses.findById({ "_id": id })
        if (!course) {
            return res.status(404).json({ msg: "notfound" })
        }
        res.status(200).json(course)
    } catch (err) {
        return res.status(404).json({ msg: "id not valed " })

    }
}


const addCourse = async (req, res) => {

    // if (!req.body.title || !req.body.price) {
    //     return res.status(404).json({ msg: "data is empty" })
    // }

    const error_val = validationResult(req)
    // console.log(error_val)
    if (!error_val.isEmpty()) {
        return res.status(400).json(error_val.array())
    }
    const newcourse = new courses(req.body)
    await newcourse.save()

    res.status(201).json(newcourse)

}


const updateCourse = async (req, res) => {
    try {
        let id = req.params.id
        // const updatecourse = await courses.findByIdAndUpdate(id, { $set: { ...req.body } })
        const updatecourse = await courses.updateOne({ "_id": id }, { $set: { ...req.body } })

        if (!updatecourse) {
            return res.status(404).json({ msg: "notfound" })
        }
        //  courses[id]=course
        res.status(200).json(updatecourse)
    } catch (err) {
        return res.status(404).json({ msg: "id not valed " })

    }

}
const deleteCourse = async(req, res) => {


    try {
        let id = req.params.id
        // const deletecourse = await courses.deleteOne({ "_id": id })
        const deletecourse = await courses.findByIdAndDelete(id)

        if (!deletecourse) {
            return res.status(404).json({ msg: "notfound" })
        }
        //  courses[id]=course
        res.status(200).json({ success: true })

    } catch (err) {
        return res.status(404).json({ msg: "id not valed " })

    }



 




}


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