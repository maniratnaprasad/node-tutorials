const express = require('express');
const { Genre, validate } = require('../model/genre');


route =express.Router();

route.get('/',async (req,res)=>{
    const genre =Genre.find();
    res.send(genre);
});

route.post('/', async (req,res)=>{
    const {error } =validate(req.body);
    if(error) res.status(404).send(" invalid genre details");

    let genre = await Genre.findOne({name:req.body.name});
    if(genre) res.status(404).send("genre already present ");

     genre = new Genre({
        name:req.body.name
    });

    await genre.save();
    res.send(genre);
    
});



module.exports = route;