const mongoose = require('mongoose');
const validator =require("validator")
const user_schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true,
        validate:[validator.isEmail,'filed must be a valid email address']
     },
     password:{
        type: String,
        required: true,
      },
    token:{
         type: String,
       }

});


const User = mongoose.model('User', user_schema);
module.exports={
    User
}

