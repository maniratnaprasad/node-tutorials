const Joi = require('joi');
const mongoose = require('mongoose');

const user = mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:255
    },

    email:{
        type:String,
        required:true,
        unique:true,
        minlength:3,
        maxlength:255
    },
    password:{
        type:String,
        required:true,
        minlength:3,
        maxlength:255
    }
});

const User =mongoose.model('RegisterUser',user);


function validateUser(user){
    const schema = Joi.object({
        name:Joi.string().min(3).max(255).required(),
        email:Joi.string().min(3).max(255).required(),
        password:Joi.string().min(3).max(255).required()
    });

    return schema.validate(user);
};


module.exports.validate =validateUser;
module.exports.User = User;

