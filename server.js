const dotenv = require('dotenv');
dotenv.config({
    path: `${__dirname}/config.env`
})

const app = require('./app')


const PORT = process.env.PORT || 3000;

app.listen(PORT, '127.0.0.1', () => {
    console.log(`[*] App is listening on port : ${PORT}`);
});