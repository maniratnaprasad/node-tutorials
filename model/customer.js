const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },

    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
        unique:true
    },
    password:{
         type:String,
        required:true,
        minlength:5,
        maxlength:255
    }
});


const User = mongoose.model('User',userSchema);

function validateUser(user){
    const Schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email:Joi.string().min(5).max(255).required(),  
        password: Joi.string().min(5).max(255).required()

    });

    console.log(user);
    return Schema.validate(user);
}


module.exports.User = User;
module.exports.validate =validateUser;