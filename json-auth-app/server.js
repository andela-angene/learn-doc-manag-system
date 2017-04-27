const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();
const config = require('./config');
const User = require('./app/models/user');

// Configuration
const port = process.env.PORT || 8080;
mongoose.connect(config.database);
app.set('superSecret', config.secret);

// bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
  res.send('Hello!');
});

app.get('/setup', (req, res) => {
  const user = new User({
    name: 'Chessmaster',
    password: 'password',
    admin: false
  });
  user.save().then((savedUser) => {
    res.send(savedUser);
  }).catch(err => res.send(err));
});

// API ROUTES
const apiRoutes = express.Router();
// route middleware to verify a token
apiRoutes.use((req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, app.get('superSecret'), (err, decoded) => {
      if (err) return res.json({ success: false, message: 'Auth failed' });
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided'
    });
  }
});

apiRoutes.get('/', (req, res) => {
  console.log(req.decoded);
  res.json({ message: `Welcome to the coolest API your id is: ${req.decoded.id}` });
});

apiRoutes.get('/users', (req, res) => {
  User.find({}).then(users => res.send(users))
    .catch(err => res.send(err));
});

apiRoutes.post('/authenticate', (req, res) => {
  User.findOne({ name: req.body.name })
  .then((user) => {
    if (!user) {
      return res.json({ success: false, message: 'Authentication failed' });
    } else if (user.password !== req.body.password) {
      return res.json({ success: false, message: 'Authentication failed.' });
    }
    const token = jwt.sign({ id: user._id }, app.get('superSecret'), {
      expiresIn: 60 * 60
    });
    res.json({
      success: true,
      message: 'Enjoy your token!',
      token
    });
  })
  .catch(err => res.status(400).send(err));
});

app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log('Magic happening at: ', port);
});
