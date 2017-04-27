import express from 'express';
import env from './config/env';

const app = express(),
  PORT = env.PORT;

app.get('*', (req, res) => {
  res.send('hello');
});

app.listen(PORT, () => {
  console.log('app started on: ', PORT);
});
