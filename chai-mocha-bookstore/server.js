const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('config');
const book = require('./app/routes/book');

const app = express();
const port = process.env.PORT || 8080;

const options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
};

mongoose.connect(config.DBHost, options);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// don't show log for test
if (config.util.getEnv('NODE_ENV') !== 'test') {
  app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

// ROUTES
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Bookstore!' });
});

app.route('/book')
  .get(book.getBooks)
  .post(book.postBook);

app.route('/book/:id')
  .get(book.getBook)
  .delete(book.deleteBook)
  .put(book.updateBook);

app.listen(port, () => {
  console.log('Magic happening at: ', port);
});

// for testing
module.exports = app;
