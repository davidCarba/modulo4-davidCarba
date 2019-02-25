'use strict';

const pokemonRouter = require('./pokemon-router');
const proxyRouter = require('./proxy-router');
const testRouter = require('./test-router');

/**
 * It's common to define an index file exporting all the things in the same folder
 * For example, we are exporting all declared routers
 */
module.exports = {
  pokemonRouter,
  proxyRouter,
  testRouter,
};
