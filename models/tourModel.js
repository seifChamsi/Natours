const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true
    },
    slug: String,
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
      trim: true,
      required: [true, 'A tour must have a description'],
      default: 'description will be available soon'
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image']
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false
    }

  }, {
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }

);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
})
//runs before the save()-.command() commmmand MIDDLEWARE
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, {
    lower: true
  });
  next();
})

// tourSchema.post('save', function (doc, next) {
//   console.log(doc);next()
// })

//QUERY MIDDLEWARE
tourSchema.pre('find', function (next) {
  this.find({
    secretTour: {
      $ne: true
    }
  })
  next();
})

tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({
    $match: {
      secretTour: {
        $ne: true
      }
    }
  })
  next()
})

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;