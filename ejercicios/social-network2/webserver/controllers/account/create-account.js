'use strict';

const Bcript = require('bcrypt');
const Joi = require('joi');
const sendgridMail = require('@sendgrid/mail');
const uuidV4 = require('uuid/v4');
const mysql = require('mysql2/promise');

sendgridMail.setApiKey(process.env.SENGRID_API_KEY);

let connection = null;
(async() => {
  connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'socialnetwork',
    password: 'password',
  });
})();

// connection.query(
//   'SELECT 1 + 1',
//   function(err, results, fields) {
//     console.log(results); // results contains rows returned by server
//     console.log(fields); // fields contains extra meta data about results, if available
//   }
// );

async function validateSchema(payload) {
  /**
   * TODO: Fill email, password and full name rules to be (all fields are mandatory):
   *  email: Valid email
   *  password: Letters (upper and lower case) and number
   *    Minimun 3 and max 30 characters, using next regular expression: /^[a-zA-Z0-9]{3,30}$/
   * fullName: String with 3 minimun characters and max 128
   */
  const schema = {
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    // fullName: Joi.string().min(3).max(128).required(),
  };

  return Joi.validate(payload, schema);
}

async function create(req, res, next) {
  const accountData = { ...req.body };

  /**
   * Validate if user data is valid to create an account
   * in other case, generate a 400 Bad Request error
   */
  try {
    await validateSchema(accountData);
  } catch (e) {
    // Create validation error
    return res.status(400).send(e);
  }

  const {
    email,
    password,
    // fullName,
  } = accountData;

  try {
    /**
     * TODO: Insert user into MySQL
     *  hash the password using bcrypt library
     */
    const securePassword = await Bcript.hash(password, 10);
    const uuid = uuidV4();
    const now = new Date();
    const createdAt = now.toISOString().substring(0, 19).replace('T', ' ');

    console.log('secure password', securePassword, 'createdAt', createdAt);
    console.log('uuid', uuid);


    /**
     * TODO: Insert user into mysql and get the user uuid
     */
    try {
      await connection.query('INSERT INTO users SET ?', {
        uuid,
        email,
        password: securePassword,
        created_at: createdAt,
      });
    } catch (e) {
      console.error(e);
      return res.status(409).send(e);
    }

    /**
     * TODO: CREATE VERIFICATION CODE AND INSERT IT INTO MySQL
     */
    const verificationCode = uuidV4();

    try {
      await connection.query('INSERT INTO users_activation SET ?', {
        user_uuid: uuid,
        verification_code: verificationCode,
        created_at: createdAt,
      });
    } catch (e) {
      console.error(e);
      return res.status(409).send(e.message);
    }

    /**
     * TODO: Tell user the account was created
     */
    res.status(204).json();

    // send email
    try {
      /**
       * Send email to the user adding the verificationCode in the link
       */
    } catch (e) {
      console.error('Sengrid error', e);
    }
  } catch (e) {
    // create error
    next(e);
  }
}

module.exports = create;
