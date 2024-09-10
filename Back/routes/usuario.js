'use strict'

var express = require('express');
var usuarioController = require('../controllers/UsuarioController');

var api = express.Router();

api.post('/login_user',usuarioController.login_user);
api.post('/registro_usuario', usuarioController.registro_usuario);

module.exports = api;