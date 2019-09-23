const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);

const getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    });
};

const getTour = (req, res) => {
    const id = parseInt(req.params.id);
    const tour = tours.find(el => el.id === id);

    if (!tour) {
        res.status(404).json({
            status: 'fail',
            message: 'invalid ID'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
};

const createTour = (req, res) => {
    //assign a new id
    const newId = tours[tours.length - 1].id + 1;

    //combine the two objects
    const newTour = Object.assign({
            id: newId
        },
        req.body
    );

    tours.push(newTour);
    //adding a new tour
    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        err => {
            res.status(200).json({
                status: 'success',
                data: {
                    tour: newTour
                }
            });
        }
    );
};

const updateTour = (req, res) => {
    const id = parseInt(req.params.id);
    const tour = tours.find(el => el.id === id);

    if (!tour) {
        res.status(404).json({
            status: 'fail',
            message: 'invalid ID'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<updated tour>'
        }
    });
};

const deleteTour = (req, res) => {
    if (req.params.id * 1 > tours.length - 1) {
        return res.status(404).json({
            status: 'fail',
            message: 'invalid ID'
        });
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
};

module.exports = {
    getAllTours,
    getTour,
    createTour,
    updateTour,
    deleteTour
}