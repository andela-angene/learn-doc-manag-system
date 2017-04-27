const Book = require('../model/book');

function getBooks(req, res) {
  Book.find({})
  .then(books => res.json(books))
  .catch(err => res.status(400).send(err));
}

function postBook(req, res) {
  const newBook = new Book(req.body);
  newBook.save()
  .then(book => res.json(book))
  .catch(err => res.status(400).send(err));
}

function getBook(req, res) {
  Book.findById(req.params.id)
  .then(book => res.json(book))
  .catch(err => res.status(400).send(err));
}

function deleteBook(req, res) {
  Book.remove({ _id: req.params.id })
  .then(() => res.json({ message: 'Book deleted.' }))
  .catch(err => res.status(400).send(err));
}

function updateBook(req, res) {
  Book.findById({ _id: req.params.id })
  .then((book) => {
    Object.assign(book, req.body).save((err, updatedBook) => {
      if (err) return res.send(err);
      return res.json(updatedBook);
    });
  })
  .catch(err => res.status(400).send(err));
}

module.exports = { getBooks, postBook, getBook, deleteBook, updateBook };
