
const {body,validationResult} =require('express-validator')
let {courses} =require('../data/courses')

const getAllCourses = (req, res) => {

    // res.send("ddddddd")
    res.json(courses)
}


const getCourses = (req, res) => {
    // console.log(req.ip)
    // res.send('<h1>welcome</h1>')
    let id = +req.params.id
    let course = courses.find((course) => course.id === id)
    if (!course) {
        return res.status(404).json({ msg: "notfound" })
    }
    res.status(200).json(course)
}


const addCourse=(req, res) => {

    // if (!req.body.title || !req.body.price) {
    //     return res.status(404).json({ msg: "data is empty" })
    // }

    const error_val = validationResult(req)
    // console.log(error_val)
    if (!error_val.isEmpty()) {
        return res.status(400).json(error_val.array())
    }

    const course = { id: courses.length + 1, ...req.body }

    courses.push(course)
    res.status(201).json(course)

}


const updateCourse=(req, res) => {

    let id =+ req.params.id
    let course =courses.find((course)=> course.id === id)
    if (!course){
        return res.status(404).json({msg:"notfound"})
    }
        course ={...course,...req.body}//overwrite
    //  courses[id]=course
        res.status(200).json(course)


}
const deleteCourse=(req, res) => {

    let id =+ req.params.id
    
    courses =courses.find((course)=> course.id  !== id)
    // res.status(200).json(course)

     res.status(200).json({success:true})
    


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