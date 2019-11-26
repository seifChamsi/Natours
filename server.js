const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({
  path: `${__dirname}/config.env`
});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
console.log(DB);
//connect to the database(Promise)
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('DB connection success');
  });

const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, '127.0.0.1', () => {
  console.log(`[*] App is listening on port : ${PORT}`);
});