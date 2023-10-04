const winston = require('winston'); 
const mongoose= require('mongoose');


module.exports = function(){
    mongoose.connect('mongodb://127.0.0.1:27017/Movie_project',{useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>console.log("connected..."))
    
    
};