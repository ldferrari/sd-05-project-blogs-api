const Joi = require('@hapi/joi');
const { User } = require('../models');
const { createToken } = require('../auth/jwt.auth');

const CREATE_SCHEMA = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  image: Joi.string().required(),
});

const createUser = async (displayName, email, password, image) => {
  const { error } = CREATE_SCHEMA.validate({
    displayName,
    email,
    password,
    image,
  });
  if (error) {
    throw new Error(error.message);
  }

  const createdUser = await User.create({ displayName, email, password, image });
  return createToken(createdUser.dataValues.id);
};

module.exports = {
  createUser,
};
