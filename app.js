const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'));

app.get('/api/v1/tours', (req, res) => {
    res.status(200)
        .json({
            status: 'success',
            results: tours.length,
            data: {
                tours
            }
        })
});

app.post('/api/v1/tours', (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({
        id: newId
    }, req.body);

    tours.push(newTour);
    //adding a new tour
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(200)
            .json({
                status: 'success',
                data: {
                    tour: newTour
                }
            })
    })

})


const port = 3000;
app.listen(port, '127.0.0.1', () => {
    console.log("[*] App is listening on port : 3000");
})