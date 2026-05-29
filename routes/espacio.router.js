const express = require("express");
const EspacioController = require("../controllers/espacio.controller");
const api = express.Router();
api.get("/",        EspacioController.obtenerEspacios);
api.put("/:numero", EspacioController.cambiarEstado);
module.exports = api;
