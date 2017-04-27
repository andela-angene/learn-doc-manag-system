'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _env = require('./config/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)(),
    PORT = _env2.default.PORT;

app.get('*', function (req, res) {
  res.send('hello');
});

app.listen(PORT, function () {
  console.log('app started on: ', PORT);
});