// const rescue = require('express-rescue');
const Joi = require('@hapi/joi');
const { User } = require('../models');

const createUser = ({ displayName, email, password, image }) => {


  User.create({ displayName, email, password, image })
    .then((newUser) => {
      const { id, displayName, email, image } = newUser;

      res.status(200).json({ id, displayName, email, image });
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).json({ message: 'Something went wrong' });
    });

    
};

module.exports = {
  createUser,
}