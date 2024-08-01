
const express = require('express')
const { body, validationResult } = require('express-validator')//body is middlewares 

// import express from 'express'
// import {body,validationResult} from 'express-validator'
const app = express()


app.use(express.json()) //bodyParser.json()


let courses = [
    {
        id: 1,
        title: "python",
        price: 12.30

    },
    {
        id: 2,
        title: "python2",
        price: 13.30

    },
]
// console.log("gggg")

app.get("/api/courses", (req, res) => {

    // res.send("ddddddd")
    res.json(courses)
})
app.get("/api/courses/:id", (req, res) => {
    // console.log(req.ip)
    // res.send('<h1>welcome</h1>')
    let id = +req.params.id
    let course = courses.find((course) => course.id === id)
    if (!course) {
        return res.status(404).json({ msg: "notfound" })
    }
    res.status(200).json(course)
})
x = [body('title')
    .notEmpty()
    .withMessage("title is empty")
    .isLength({ min: 2 })
    .withMessage("title at least is 2 digits"),
     body("price").
    notEmpty()
    .withMessage("price is empty")
    .isNumeric()
    .withMessage("price not number")


]

app.post("/api/courses", x, (req, res) => {

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

})


app.patch("/api/courses/:id", x, (req, res) => {

    let id =+ req.params.id
    let course =courses.find((course)=> course.id === id)
    if (!course){
        return res.status(404).json({msg:"notfound"})
    }
        course ={...course,...req.body}//overwrite
    //  courses[id]=course
        res.status(200).json(course)


})


app.delete("/api/courses/:id", x, (req, res) => {

    let id =+ req.params.id
    
    courses =courses.find((course)=> course.id  !== id)
    // res.status(200).json(course)

     res.status(200).json({success:true})
    


})


app.listen(5000, () => {
    console.log("===listening===")
})
