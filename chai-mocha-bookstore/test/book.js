// Set environment to test
process.env.NODE_ENV = 'test';

const Book = require('../app/model/book');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();

chai.use(chaiHttp);

describe('Books', () => {
  beforeEach((done) => {
    Book.remove({}, () => {
      done();
    });
  });

  describe('/GET book', () => {
    it('it should GET all the books', (done) => {
      chai.request(server)
        .get('/book')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('/POST book', () => {
    it('should not POST a book without pages field', (done) => {
      const book = {
        title: 'The lord of the rings',
        author: 'JR Tolken',
        year: 1954
      };
      chai.request(server)
        .post('/book')
        .send(book)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('pages');
          res.body.errors.pages.should.have.property('kind').eql('required');
          done();
        });
    });

    it('should POST a book', (done) => {
      const book = {
        title: 'The lord of the rings',
        author: 'JR Tolken',
        year: 1954,
        pages: 1101
      };
      chai.request(server)
        .post('/book')
        .send(book)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.all.keys('title', 'author', 'year', 'pages', '_id', 'createAt');
          res.body.should.have.property('title');
          done();
        });
    });
  });

  describe('/GET/:id book', () => {
    it('should GET a book by the given id', (done) => {
      const book = new Book({
        title: 'The lord of the rings',
        author: 'JR Tolken',
        year: 1954,
        pages: 1101
      });
      book.save((err, savedBook) => {
        chai.request(server)
          .get(`/book/${savedBook.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('title');
            done();
          });
      });
    });
  });

  describe('/PUT/:id book', () => {
    it('should UPDATE a book given the id', (done) => {
      const book = new Book({
        title: 'The lord of the rings',
        author: 'JR Tolken',
        year: 1954,
        pages: 1101
      });
      book.save((err, savedBook) => {
        chai.request(server)
        .put(`/book/${savedBook.id}`)
        .send({ title: 'Legend of Kora' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('title');
          res.body.title.should.eql('Legend of Kora');
          done();
        });
      });
    });
  });

  describe('/DELETE/:id book', () => {
    it('should DELETE a book given the id', (done) => {
      const book = new Book({
        title: 'The lord of the rings',
        author: 'JR Tolken',
        year: 1954,
        pages: 1101
      });
      book.save((err, savedBook) => {
        chai.request(server)
        .delete(`/book/${savedBook.id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.eql('Book deleted.');
          done();
        });
      });
    });
  });
});
