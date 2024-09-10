'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
    nombre: {type: String, required: true},
    apellidos: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    telefono: {type: String, required: true},
    rol: {type: String, enum: ['Administrador', 'Vendedor', 'Tecnico'], required: true},
    dni: {type: String, required: true}
});

module.exports = mongoose.model('usuario', UsuarioSchema);