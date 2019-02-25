'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const router = require('./routers');


const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.startDate = Date.now();

  next();
});

app.use('/api', router.pokemonRouter);
app.use('/api', router.proxyRouter);
app.use('/api', router.testRouter);

app.use((req, res, next) => {
  const now = Date.now();
  const diff = now - req.startDate;

  console.log(`${req.method} ${req.originalUrl}: ${diff} ms`);
});


app.listen(8000, () => {
  console.log('Server running on port 8000');
});
