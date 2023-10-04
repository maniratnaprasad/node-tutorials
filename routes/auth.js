const mongoose = require('mongoose');
const express = require('express');
const { User } = require('../model/registerUser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const config = require('config');
 
const route = express.Router();

route.post('/', async (req,res)=>{
    const { error } = validate(req.body);
    if( error ) return res.status(400).send("invalid email or password");

    let user = await User.findOne({email:req.body.email} );
    if(!user)  return res.status(400).send("invalid email or password");
    
    const validPassword =  await bcrypt.compare(req.body.password,user.password);
    if(!validPassword)  return res.status(400).send("invalid email or password");

    const token =jwt.sign({_id:user._id},config.get('Key'));

    res.send(token);
    


});

function  validate(data)
{
    const Schema = Joi.object({
        email:Joi.string().min(3).required(),
        password:Joi.string().min(3).required()
    });

    return Schema.validate(data);
}
module.exports = route;