/* eslint-disable no-unused-vars */

'use strict';

const express = require('express');

const router = express.Router();

/**
 * To test it from terminal:
 * curl http://localhost:8000/api/pokemons -d '{"name":"pikachu","attacks":[]}' -H 'content-type: application/json' -v
 */
router.post('/pokemons', (req, res, next) => {
  const pokemonData = Object.assign({}, req.body);

  console.log('me llego el siguiente request body', pokemonData);
  /**
   * Simulamos insertar en una bbdd que siempre hay delay
   */
  setTimeout(() => {
    res.status(201).send();
  }, 2000);

  req.REQUEST_ID = '12345';
  next();
});

// /**
//  * Middleware de ejemplo
//  */
// app.use((req, res, next) => {
//   console.log('Recibi la request', req.REQUEST_ID);
// });

router.get('/pokemons', (req, res, next) => {
  const pokemons = [{
    name: 'Pikachu',
    type: 'Electric',
    attacks: ['Quick attack', 'Thunderbolt'],
  },
  {
    name: 'Bulbasaur',
    type: 'Grass',
    attacks: ['Razor leaf', 'Vine whip'],
  },
  {
    name: 'Charmander',
    type: 'Fire',
    attacks: ['Fire blast'],
  },
  {
    name: 'Venasaur',
    type: 'Grass',
    attack: ['Solar Beam', 'Razor leaf'],
  }];

  res.send(pokemons);
});

router.get('/pokemons/:name', (req, res, next) => {
  const pokemons = [{
    name: 'Pikachu',
    type: 'Electric',
    attacks: ['Quick attack', 'Thunderbolt'],
  },
  {
    name: 'Bulbasaur',
    type: 'Grass',
    attacks: ['Razor leaf', 'Vine whip'],
  },
  {
    name: 'Charmander',
    type: 'Fire',
    attacks: ['Fire blast'],
  },
  {
    name: 'Venasaur',
    type: 'Grass',
    attack: ['Solar Beam', 'Razor leaf'],
  },
  {
    name: 'Venasaur',
    type: 'Grass',
    attack: ['Razor leaf'],
  }];

  // const name = req.params.name;
  const { name } = req.params;
  /*
  *Given a pokemon name, search in our array data the pokemon data
   */

  const pokemonsFound = pokemons.filter((pokemon) => {
    if (pokemon.name === name) {
      return true;
    }
    return false;
  });

  if (pokemonsFound.length === 0) {
    res.status(404).send();
  } else {
    res.send(pokemonsFound);
  }
});
router.get('/pokemons/name/:name', (req, res, next) => {
  const pokemons = [{
    name: 'Pikachu',
    type: 'Electric',
    attacks: ['Quick attack', 'Thunderbolt'],
  },
  {
    name: 'Bulbasaur',
    type: 'Grass',
    attacks: ['Razor leaf', 'Vine whip'],
  },
  {
    name: 'Charmander',
    type: 'Fire',
    attacks: ['Fire blast'],
  },
  {
    name: 'Venasaur',
    type: 'Grass',
    attack: ['Solar Beam', 'Razor leaf'],
  },
  {
    name: 'Venasaur',
    type: 'Grass',
    attack: ['Razor leaf'],
  }];

  // const name = req.params.name;
  const { name } = req.params;
  /*
  *Given a pokemon name, search in our array data the pokemon data
   */

  const pokemonsFound = pokemons.filter((pokemon) => {
    if (pokemon.name === name) {
      return true;
    }
    return false;
  });

  if (pokemonsFound.length === 0) {
    res.status(404).send();
  } else {
    res.send(pokemonsFound);
  }
});

router.get('/pokemons/type/:type', (req, res, next) => {
  const pokemons = [{
    name: 'Pikachu',
    type: 'Electric',
    attacks: ['Quick attack', 'Thunderbolt'],
  },
  {
    name: 'Bulbasaur',
    type: 'Grass',
    attacks: ['Razor leaf', 'Vine whip'],
  },
  {
    name: 'Charmander',
    type: 'Fire',
    attacks: ['Fire blast'],
  },
  {
    name: 'Venasaur',
    type: 'Grass',
    attack: ['Solar Beam', 'Razor leaf'],
  }];

  const { type } = req.params;

  const pokemonsFound = pokemons.filter((pokemon) => {
    if (pokemon.type === type) {
      return true;
    }
    return false;
  });

  if (pokemonsFound.length === 0) {
    res.status(404).send();
  } else {
    res.send(pokemonsFound);
  }
});

module.exports = router;
