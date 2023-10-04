const express = require('express');
const routerCustomer = require('../routes/customer');
const routerMovie =require('../routes/movies');
const routerGenre =require('../routes/genre');
const routerRental =require("../routes/rentals");
const routerAuth =require('../routes/auth');
const routerRegisterUser =require('../routes/registerUser');
const error =require("../middleware/error");

module.exports = function(app){
    app.use(express.json());
    app.use('/api/customer',routerCustomer);
    app.use('/api/movies',routerMovie);
    app.use('/api/genres',routerGenre);
    app.use('/api/rentals',routerRental);
    app.use('/api/registerUser',routerRegisterUser);
    app.use('/api/auth',routerAuth);

    app.use(error);
};