const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true
  },

  ratingAverage: {
    type: Number,
    default: 4.5
  },
  ratingQuantity: {
    type: Number,
    default: 4.5
  },
  duration: {
    type: String,
    required: [true, 'A tour must have a duration rate']
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a max group size']
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  }
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
