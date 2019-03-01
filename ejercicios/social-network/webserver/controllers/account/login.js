'use strict';

const bcrypt = require('bcrypt');
const Joi = require('joi');
const mysqlPool = require('../../../databases/mysql-pool');

async function validateData(payload) {
  const schema = {
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  };

  return Joi.validate(payload, schema);
}

async function login(req, res, next) {
  const accountData = { ...req.body };
  try {
    await validateData(accountData);
  } catch (e) {
    // Create validation error
    return res.status(400).send(e);
  }
}


module.exports = login;
