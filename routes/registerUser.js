const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');


const {validate ,User } = require('../model/registerUser');

const mongoose = require('mongoose');


const router = express.Router();

router.post('/', async (req,res)=>{
    const { error } = validate(req.body);
    if( error ) return res.status(404).send("data is not valid with schema");

    let user = await User.findOne({email:req.body.email});
    if(user) return res.status(404).send("user already exists");


    user = new User(_.pick(req.body,['name','email','password']));

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(user.password,salt);
    user.password = hashed;

    await user.save();

    res.send(_.pick(user,['name','email','password']));

});


module.exports = router;



