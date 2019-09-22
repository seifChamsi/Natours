const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const Sentry = require('@sentry/node');
Sentry.init({
    dsn: 'https://abb3551809814f23a3cf8bbf9f6c7dd9@sentry.io/1552699'
});

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log('Hello from the middleware');
    next();
});
Sen();
app.use((req, res, next) => {
    req.requestTime = new Date().toUTCString();
    next();
});

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
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

//Return all the tours
// app.get('/api/v1/tours', getAllTours);

// //Add a tour
// app.post('/api/v1/tours', createTour);

// //Get a specific tour by id
// app.get('/api/v1/tours/:id', getTour);

// //Update/modify a specific tour property by id
// app.patch('/api/v1/tours/:id', updateTour);

// //delete a specific tour by id
// app.delete('/api/v1/tours/:id', deleteTour);

//Routing
app
    .route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour)

app
    .route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)


const PORT = 3000;
app.listen(PORT, '127.0.0.1', () => {
    console.log(`[*] App is listening on port : ${PORT}`);
});