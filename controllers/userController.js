const express = require('express');
const services = require('../services/Users');

const userController = express.Router();

userController.post('/', async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const token = await services.createUser(
      displayName,
      email,
      password,
      image,
    );
    return res.status(201).json({ token });
  } catch (error) {
    if (error.original) {
      if (error.original.errno === 1062) {
        return res.status(409).json({ message: 'Usuário já existe' });
      }
    }
    if (error.message) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(400).json({ message: 'algo deu ruim' });
  }
});
// GET /users
// userController.get('/', (req, res) => {});
// GET /user/:id
// userController.get('/:id', (req, res) => {});
// DELETE /user/:id
// userController.delete('/:id', (req, res) => {});
// PUT /user:id
// userController.put('/:id', (req, res) => {});

module.exports = userController;
