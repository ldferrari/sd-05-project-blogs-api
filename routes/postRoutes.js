const express = require('express');
const { postControllers } = require('../controllers');
const { tokenValidation, postValidation } = require('../middlewares');

const postRoutes = express.Router();

postRoutes.post('/', tokenValidation, postValidation, postControllers.create);

module.exports = postRoutes;
