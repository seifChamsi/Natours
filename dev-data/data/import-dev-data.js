const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({
  path: `./config.env`
});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
console.log(DB);
//connect to the database
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
  })
  .then(() => {
    console.log('DB connection success');
  });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('DATA is Loaded Successfully');
  } catch (error) {
    console.log(error);
  }
};
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('DATA is deleted Successfully');
  } catch (error) {
    console.log(error);
  }
};

console.log(process.argv);

if (process.argv[2] == '--import') {
  importData();
  console.log('Importing Data...');
  process.exit();
} else if (process.argv[2] == '--delelte') {
  deleteData();
  console.log('Deleting Data is processing...');
  process.exit();
} else {
  console.log('You should specify the operation you wanna execute');
}
