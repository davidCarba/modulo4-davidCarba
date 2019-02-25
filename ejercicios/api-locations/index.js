'use strict';

const bodyParse = require('body-parser');
const express = require('express');
const router = require('./routers');

const app = express();
app.use(bodyParse.json());

app.use('/api', router.locationRouter);

app.listen(8000, () => {
  console.log('Server running on port 8000');
});
