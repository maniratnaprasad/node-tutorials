const mongoose = require('mongoose');
const winston =require('winston');
require('winston-mongodb');
const express = require('express');
const config = require('config');
const routerCustomer = require('./routes/customer');
const routerMovie =require('./routes/movies');
const routerGenre =require('./routes/genre');
const routerRental =require("./routes/rentals");
const routerAuth =require('./routes/auth');
const routerRegisterUser =require('./routes/registerUser');
const error =require("./middleware/error");
const app = express();

require('./startup/error');

// process.on('uncaughtException', (err)=>{
//     console.log("exception occured here.........");
//     winston.error(err.message,err);
// });

// winston.add(new winston.transports.File({filename:'logfile.log'}));
// winston.add(new winston.transports.MongoDB({db:'mongodb://127.0.0.1/Movie_project',level:winston.info}));
    

if(!config.get('Key')){
    console.log("FATAL ERROR : Key  not found");
    process.exit(1);
}

require('./startup/db')();
// mongoose.connect('mongodb://127.0.0.1:27017/Movie_project',{useNewUrlParser: true, useUnifiedTopology: true})
// .then(()=>console.log("connected..."))
// .catch(err =>console.log("failed to connect...."))

require('./startup/route')(app);

// app.use(express.json());
// app.use('/api/customer',routerCustomer);
// app.use('/api/movies',routerMovie);
// app.use('/api/genres',routerGenre);
// app.use('/api/rentals',routerRental);
// app.use('/api/registerUser',routerRegisterUser);
// app.use('/api/auth',routerAuth);

// app.use(error);



app.listen(3000,()=>{console.log("listening on port 3000")});
