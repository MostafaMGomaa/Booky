const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const imageDownloader = require('node-image-downloader');

const Book = require('../models/bookModel');

dotenv.config({ path: '../config.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

const extractUrl = async () => {
  try {
    const books = await Book.find();
    books.map((book) => {
      let obj = {
        uri: book.thumbnailUrl,
        filename: book.slug,
      };

      fs.writeFileSync(
        './urls.json',
        `${JSON.stringify(obj)},`,
        { flag: 'a+' },
        (err) => {}
      );
    });
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

const dowloadImgs = async () => {
  try {
    const url = JSON.parse(fs.readFileSync(`${__dirname}/urls.json`, 'utf-8'));
    await imageDownloader({
      imgs: url,
      dest: './../public/img/books', //destination folder
    })
      .then((info) => {
        console.log('all done', info);
      })
      .catch((error, response, body) => {
        console.log('something goes bad!');
        console.log(error);
      });
  } catch (err) {
    console.log(err);
  }

  process.exit();
};

if (process.argv[2] === '--extract') {
  extractUrl();
}
if (process.argv[2] === '--down') {
  dowloadImgs();
}
