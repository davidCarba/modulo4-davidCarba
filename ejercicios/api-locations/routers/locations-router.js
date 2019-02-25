'use strict';

const express = require('express');

const router = express.Router();

router.post('/locations', (req, res, next) => {
  const locationData = Object.assign({}, req.body);

  console.log('Me ha llegado la siguiente request', locationData);

  setTimeout(() => {
    res.status(201).send();
  }, 2000);

  req.REQUEST_ID = '12345';
  next();
});

router.get('/locations', (req, res, next) => {
  const locations = [{
    name: 'Sahara',
    type: 'Desert',
  },
  {
    name: 'Antartico',
    type: 'Desert',
  },
  {
    name: 'Giant Forest',
    type: 'Forest',
  },
  {
    name: 'Rainbow reef',
    type: 'Coral rees',
  }];
  res.send(locations);
});

router.get('/locations/:name', (req, res, next) => {
  const locations = [{
    name: 'Sahara',
    type: 'Desert',
  },
  {
    name: 'Antartico',
    type: 'Desert',
  },
  {
    name: 'Giant Forest',
    type: 'Forest',
  },
  {
    name: 'Rainbow reef',
    type: 'Coral rees',
  }];

  const { name } = req.params;

  const locationFound = locations.filter((location) => {
    if (location.name === name) {
      return true;
    }
    return false;
  });

  if (locationFound === 0) {
    res.status(404).send();
  } else {
    res.send(locationFound);
  }
});
