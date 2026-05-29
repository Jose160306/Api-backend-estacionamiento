const express = require("express");
const UsuarioController = require("../controllers/usuario.controller");
const api = express.Router();
api.post("/registro",  UsuarioController.registrar);
api.post("/login",     UsuarioController.login);
api.put("/contrasena/:noControl", UsuarioController.cambiarContrasena);
module.exports = api;
