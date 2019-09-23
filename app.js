const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');
const Sentry = require('@sentry/node');
Sentry.init({
    dsn: 'https://abb3551809814f23a3cf8bbf9f6c7dd9@sentry.io/1552699'
});


const app = express();

//middlewares we gonna use
app.use(express.json());
app.use(morgan('dev'))
//to reveal the request time
app.use((req, res, next) => {
    req.requestTime = new Date().toUTCString();
    next();
});




//Router mounting     
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter)

const PORT = 3000;
app.listen(PORT, '127.0.0.1', () => {
    console.log(`[*] App is listening on port : ${PORT}`);
});