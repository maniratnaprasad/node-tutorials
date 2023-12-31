const Joi = require('joi');
const mongoose =require('mongoose');


const Rental = mongoose.model('Rentals', new mongoose.Schema({
    customer :{
        type: new mongoose.Schema({
            name: {
                type:String,
                required:true,
                minlength:5,
                maxlength:255
            },
            isGold:{
                type:Boolean,
                required:true,
                default:true
            },
            phone:{
                type:String,
                // required:true,
                minlength:5,
                maxlength:10  
            }
        }),
        required:true
    },

    movie:{
        type: new mongoose.Schema({
                title: {
                    type:String,
                    required:true,
                    minlength:5,
                    maxlength:255
                },
                dailyRentalRate:{
                    type:Number,
                    required:true,
                    min:0,
                    max:255
                }
        }),
        required:true
    },
    

    dateOut:{
        type:Date,
        required:true,
        default:Date.now
    },

    dateReturned : Date,

    rentalFee :{
        type:Number,
        min:0
    }

}));




function validateRental(rental){
    const schema = Joi.object({
        customerId :     Joi.string().required(),
        movieId : Joi.string().required()
    });

    return schema.validate(rental);
}

module.exports.Rental = Rental;
module.exports.validate =validateRental;