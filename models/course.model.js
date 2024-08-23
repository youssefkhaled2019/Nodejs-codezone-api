const mongoose = require('mongoose');

const course_schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }

});


const Courses = mongoose.model('Course', course_schema);
module.exports={
    Courses
}