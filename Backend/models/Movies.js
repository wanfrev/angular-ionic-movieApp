const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  externalId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  originalTitle: {
    type: String,
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  synopsis: {
    type: String,
    required: true,
  },
  cast: {
    type: [String],
    default: [],
  },
  imageUrl: {
    type: String,
  },
  otherImages: {
    type: [String],
    default: [],
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  criticAverageRating: {
    type: Number,
    default: 0,
  },
  numberOfRatings: {
    type: Number,
    default: 0,
  },
  numberOfCriticRatings: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
    enum: ['movie', 'series'],
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  user: {  // 📌 Agregamos este campo para que la película pertenezca a un usuario
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
