const APIFeatures = require('../utils/APIFeatures')
const Tour = require('./../models/tourModel');

//midleware for top 5
const aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingAverage,price';
  req.query.fields = 'name,price,ratingAverage,duration,difficulty';
  next();
};

const getAllTours = async (req, res) => {
  try {
    //execute query
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
    console.log(features);
    const tours = await features.query;
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

const getTour = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const tour = await Tour.findById(id);
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    });
  }
};

const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
    console.log(error);
  }

  //assign a new id
};

const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    });
  }
};

const deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      message: 'document deleted successfully'
    });
  } catch (error) {
    res.status(204).json({
      status: 'fail',
      data: error
    });
  }
};

getTourStat = async (req, res) => {
  try {
    const stats = await Tour.aggregate([{
        $match: {
          ratingAverage: {
            $gte: 4.5
          }
        }
      },

      {
        $group: {
          _id: '$difficulty',
          numTours: {
            $sum: 1
          },
          numRatings: {
            $sum: 'ratingsAverage'
          },
          avgRating: {
            $avg: '$ratingAverage'
          },
          avgPrice: {
            $avg: '$price'
          },
          minPrice: {
            $min: '$price'
          },
          maxPrice: {
            $max: '$price'
          }
        },
        // get $group() {
        //   return this._$group;
        // },
        // set $group(value) {
        //   this._$group = value;
        // },
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    });
  }
};

const getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;
    const plan = await Tour.aggregate([{
        $unwind: '$startDates'
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: {
            $month: '$startDates'
          },

          numTourStarts: {
            $sum: 1
          },
          tours: {
            $push: '$name'
          }
        }
      }
    ])

    res.status(200).json({
      status: 'success',
      data: {
        plan
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    });
  }
}

module.exports = {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStat,
  getMonthlyPlan
};