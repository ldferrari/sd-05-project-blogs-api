const Joi = require('@hapi/joi');
const { User } = require('../models');
const { createToken } = require('../auth/jwt.auth');

const LOGIN_SCHEMA = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
});

const login = async (email, password) => {
  const { error } = LOGIN_SCHEMA.validate({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }

  const user = await User.findOne({ where: { email } });
  console.log(user);
  if (!user || user.dataValues.password !== password) {
    throw new Error('Campos inválidos');
  }
  return createToken(user);
};

module.exports = {
  login,
};