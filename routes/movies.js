const express = require('express');
const { Movie, validate } = require('../model/movies');
const { Genre } = require('../model/genre');
const mongoose =require('mongoose');

route =express.Router();

route.get('/',async (req,res)=>{
    const movies =Movie.find();
    res.send(movies);
});

route.post('/', async (req,res)=>{
    const {error } =validate(req.body);
    if(error) res.status(404).send(" invalid movie details");

    let genre = await Genre.findById(req.body.genreId); // by this we can get genre by id
    if(!genre) res.status(404).send(" invalid genre");

    const movie = new Movie({
        title:req.body.title,
        genre:{
            _id:genre._id,
            name:genre.name
        },
        numberInStocks: req.body.numberInStocks,
        dailyRentalRate:req.body.dailyRentalRate
    });

    await movie.save();
    res.send(movie);
    
});



module.exports = route;