'use strict';

const express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  db = require('./config/db'),
  env = require('./config/env'),
  router = require('./router/index');

const app = express();
const PORT = env.PORT;

app.use(morgan('tiny'));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  next();
});

router(app, db);

// drop and resync with { force: true }
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log('Express listening on port:', PORT);
  });
});
