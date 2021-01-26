const rescue = require('express-rescue');
const { createToken } = require('../Utils/jwtAuth');
const { User } = require('../models');
const userService = require('../Service/UserServices');

const createUser = rescue(async (req, res) => {
  const { body } = req;
  const createdUser = await User.create(body);
  const { password: _, ...userWithoutPassword } = createdUser;

  const token = createToken(userWithoutPassword);
  return res.status(201).json({ token });
});

const login = rescue(async (req, res, next) => {
  try {
    const emailAndPassword = req.body;

    const token = await userService.login(emailAndPassword, next);
    return res.status(200).json({ token });
  } catch (error) {
    const { message, status } = error;

    next({ message, status });
  }
});

const getAll = rescue(async (req, res) => {
  const allUsers = await User.findAll();
  res.status(200).json(allUsers);
});

const getUser = rescue(async (req, res) => {
  const { id } = req.params;

  const user = await userService.getUser(id);

  return res.status(200).json(user);
});

module.exports = { createUser, login, getAll, getUser };