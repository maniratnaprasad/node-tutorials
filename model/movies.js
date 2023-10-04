const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genre");

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    trim: true,
  },

  genre: {
    type: genreSchema,
    required: true,
  },

  numberInStocks: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

function validateMovie(movie) {
  const Schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.string().required(), // note in validation we have genre id  but in movie schema we have genre object, so we have to convert while uploading
    numberInStocks: Joi.number().min(0).max(100).required(),
    dailyRentalRate: Joi.number().min(0).max(100).required(),
  });

  return Schema.validate(movie);
}

exports.Movie = Movie;
exports.validate = validateMovie;
