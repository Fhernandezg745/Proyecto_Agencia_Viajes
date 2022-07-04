const express = require('express');
const router = express.Router();

const mainController = require("../../src/controllers/mainControllers");

router.get('/', mainController.home);

router.get('/register', mainController.register);

router.get('/login', mainController.login);

router.get('/details', mainController.details);

router.get('/carrito', mainController.carrito);

module.exports = router;