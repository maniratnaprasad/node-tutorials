require('express-async-errors');
const winston =require('winston');
require('winston-mongodb');


module.exports = function(){
    process.on('uncaughtException', (err)=>{
        // console.log("exception occured here.........");
        winston.error(err.message,err);
    });

    process.on('unhandledRejection',(err)=>{ 
        throw err;
    });

    winston.add(new winston.transports.File({filename:'logfile.log'}));
    winston.add(new winston.transports.MongoDB({db:'mongodb://127.0.0.1/Movie_project',level:winston.info}));
        


};