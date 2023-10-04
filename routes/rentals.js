const express= require('express');
const mongoose =require('mongoose');
const { Rental,validate } = require('../model/rentals');
const {User} =require('../model/customer');
const {Movie } =require('../model/movies');
 
const router= express.Router();

router.post('/', async (req,res)=>{
    const { error }= validate(req.body);
    if(error)  return res.status(404).send("invalid details entered");

    let customer = await User.findById(req.body.customerId);

    if(!customer) return res.status(404).send("invalid customer id");

    let  movie =await Movie.findById(req.body.movieId);
    if(!movie)  return res.status(404).send("invalid movie id");

    if(movie.numberInStocks==0) return res.status(404).send("movie not in stock");

    const rental = new Rental({
        customer:{
            _id:customer._id,
            name:customer.name,
            isGold:customer.isGold
            
        },
        movie:{
            _id:movie._id,
            title:movie.title,
            dailyRentalRate:movie.dailyRentalRate
        },
        
    });

    await rental.save();

    movie.numberInStocks--;
    movie.save();

    res.send(rental);


});



module.exports = router;